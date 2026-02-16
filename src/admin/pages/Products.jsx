import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../Redux/Apis/product.Api";
import Loader from "../components/Loader";
import SmallLoader from "../components/SmallLoader";
import { toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState("grid");
  const [searchText, setSearchText] = useState("");
  const [filteredSearch, setFilteredSearch] = useState();
  const [deletingId, setDeletingId] = useState(null)

  const { data: productsData, isLoading: getLoad } = useGetProductsQuery();
  const [deleteMutation] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteMutation(id).unwrap();
      if (res.success) {
        toast.success("Product Deleted Successfully");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error(err?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSearch = (text) => {
    if (!text) {
      setFilteredSearch(null);
      return;
    }
    const results = productsData?.products?.filter((item) =>
      item?.heroSection?.productName?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSearch(results);
  };

  return (
    <div className="p-8 mt-5 ml-20 min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-manrope font-semibold">Products</h1>
            <p className="text-gray-400 font-manrope text-sm mt-1">
              Manage Your Perfume Collection
            </p>
          </div>

          <button
            className="px-6 py-3 bg-[#00D4FF] text-white text-sm font-semibold rounded-xl hover:bg-[#14e1ff] transition-all shadow-lg active:scale-95"
            onClick={() => navigate("/admin/products/add")}
          >
            + Add Product
          </button>
        </div>

        {/* SEARCH + VIEW TOGGLE */}
        <div className="mb-10">
          <div className="flex justify-between items-center bg-[#020523] border border-white/5 p-3 rounded-xl shadow-inner">
            <div className="flex items-center gap-3 bg-[#0B1135] h-12 rounded-xl border border-white/10 w-[450px] px-4 group focus-within:border-[#00D4FF]/30 transition-all">
              <Search
                size={18}
                className="text-gray-400 group-focus-within:text-[#00D4FF] transition-colors"
              />
              <input
                type="text"
                placeholder="Search by product name..."
                className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch(e.target.value.trim());
                }}
              />
            </div>

            {/* Toggle */}
            <div className="flex gap-2 bg-[#0B1135] border border-white/10 p-1 rounded-xl">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 rounded-lg transition-all ${layout === "grid"
                  ? "bg-[#00D4FF] text-white shadow-md shadow-[#00D4FF]/20"
                  : "text-gray-400 hover:bg-white/5"
                  }`}
              >
                <Icon icon="mynaui:grid" width="20" height="20" />
              </button>

              <button
                onClick={() => setLayout("list")}
                className={`p-2 rounded-lg transition-all ${layout === "list"
                  ? "bg-[#00D4FF] text-white shadow-md shadow-[#00D4FF]/20"
                  : "text-gray-400 hover:bg-white/5"
                  }`}
              >
                <Icon icon="vaadin:lines-list" width="20" height="20" />
              </button>
            </div>
          </div>
        </div>

        {getLoad && <div className="flex justify-center py-20"><Loader /></div>}

        {/* LIST VIEW */}
        {layout === "list" && productsData?.products && (
          <div className="bg-[#0B1135] border border-white/10 rounded-md overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left border-collapse table-fixed">
                <thead className="bg-white/[0.02] text-white text-xs font-bold uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-5 px-10 w-[12%] font-manrope tracking-widest uppercase">ID</th>
                    <th className="py-5 px-10 w-[43%] font-manrope tracking-widest text-center uppercase">Product Collection</th>
                    <th className="py-5 px-10 w-[15%] font-manrope tracking-widest text-center uppercase">Price (€)</th>
                    <th className="py-5 px-10 w-[15%] font-manrope tracking-widest text-center uppercase">Stock Level</th>
                    <th className="py-5 px-10 w-[15%] font-manrope tracking-widest text-right uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {(filteredSearch ?? productsData?.products).map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-sm"
                    >
                      <td className="py-6 px-10 text-gray-500 font-mono">
                        #{p._id.slice(-8)}
                      </td>

                      <td className="py-6 px-10 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-xl bg-[#020523] border border-white/5 flex items-center justify-center p-2 shadow-lg">
                            <img
                              src={p?.heroSection?.bgImage}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold text-base font-manrope">{p?.heroSection?.productName}</p>
                            <p className="text-[#00D4FF] text-[10px] mt-0.5 font-bold uppercase tracking-widest opacity-80">{p?.heroSection?.gardenName}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-6 px-10 font-bold text-white text-lg font-manrope text-center">
                        €{p?.productDetailsSection?.price}
                      </td>

                      <td className="py-6 px-10 text-center">
                        <span className="bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold font-manrope border border-green-500/20">
                          {p.stock ?? 0} Units
                        </span>
                      </td>

                      <td className="py-6 px-10">
                        <div className="flex justify-end gap-3">
                          <button
                            className="p-3 bg-[#00D4FF]/10 text-[#00D4FF] rounded-xl hover:bg-[#00D4FF] hover:text-white transition-all active:scale-90 border border-[#00D4FF]/20"
                            onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-500/20"
                            onClick={() => handleDelete(p._id)}
                          >
                            {deletingId === p._id ? (
                              <SmallLoader />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {layout === "grid" && productsData?.products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {(filteredSearch ?? productsData?.products).map((p, i) => (
              <div
                key={i}
                className="bg-[#0B1135] border border-white/5 rounded-[2rem] p-8 flex flex-col group hover:border-[#00D4FF]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Image Container */}
                <div className="h-[280px] w-full flex items-center justify-center mb-6 relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020523]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <img
                    src={p?.heroSection?.bgImage}
                    alt=""
                    className="h-[85%] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-manrope font-semibold text-white leading-tight">
                      {p?.heroSection?.productName}
                    </h2>
                    <span className="text-[10px] bg-[#020523] border border-white/10 text-gray-400 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                      {p?.heroSection?.gardenName}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs font-manrope line-clamp-2 h-8 mb-6">
                    {p?.productDetailsSection?.shortDescription}
                  </p>

                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Price</p>
                      <p className="text-2xl font-manrope font-bold text-white">€{p?.productDetailsSection?.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Availability</p>
                      <p className="text-[#0DFF00] font-bold text-sm">
                        {p.stock ?? 0} units
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFFFFF0A] border border-white/10 py-3.5 rounded-2xl text-sm font-semibold text-gray-300 hover:bg-[#00D4FF] hover:text-white hover:border-[#00D4FF] transition-all"
                    >
                      <Icon icon="mynaui:edit" width="18" />
                      Edit Product
                    </button>
                    <button
                      className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                      onClick={() => handleDelete(p._id)}
                    >
                      {deletingId === p._id ? (
                        <SmallLoader />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
