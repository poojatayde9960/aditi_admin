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

const ProductsSkeleton = ({ layout }) => {
  return (
    <div className="animate-pulse">
      {/* Search + Toggle Skeleton */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 bg-[#0B1135]/50 border border-white/10 p-4 rounded-2xl">
          <div className="h-14 bg-white/5 rounded-2xl w-full md:w-[550px]"></div>
          <div className="h-12 bg-white/5 rounded-xl w-32 mx-auto md:mx-0"></div>
        </div>
      </div>

      {layout === "grid" ? (
        /* Grid Layout Skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#0B1135] border border-white/5 rounded-[2rem] p-8 flex flex-col h-[600px]">
              <div className="h-[280px] w-full bg-white/5 rounded-3xl mb-6"></div>
              <div className="space-y-4 flex-1">
                <div className="h-8 bg-white/10 rounded-lg w-3/4"></div>
                <div className="h-4 bg-white/5 rounded-lg w-full"></div>
                <div className="h-4 bg-white/5 rounded-lg w-5/6"></div>
                <div className="flex justify-between items-end mt-auto pt-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 rounded w-12"></div>
                    <div className="h-8 bg-white/10 rounded w-20"></div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-3 bg-white/5 rounded w-16 ml-auto"></div>
                    <div className="h-4 bg-white/10 rounded w-24 ml-auto"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-6 border-t border-white/5">
                <div className="h-12 bg-white/10 rounded-2xl flex-1"></div>
                <div className="h-12 bg-white/10 rounded-2xl w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Layout Skeleton */
        <div className="bg-[#0B1135] border border-white/10 rounded-md overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-4 pb-4 border-b border-white/10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-white/10 rounded w-16 mx-auto"></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 items-center py-4 border-b border-white/5 last:border-0">
                <div className="h-4 bg-white/5 rounded w-12"></div>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
                  <div className="h-4 bg-white/10 rounded w-24"></div>
                </div>
                <div className="h-6 bg-white/10 rounded w-16 mx-auto"></div>
                <div className="h-6 bg-white/10 rounded-full w-20 mx-auto"></div>
                <div className="h-6 bg-white/10 rounded-full w-20 mx-auto"></div>
                <div className="flex justify-end gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
                  <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState("grid");
  const [searchText, setSearchText] = useState("");
  const [filteredSearch, setFilteredSearch] = useState();
  const [deletingId, setDeletingId] = useState(null);

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
    <div className="min-h-screen text-white bg-[#020523] font-manrope">
      <div>
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="page-header-title">Products</h1>
            <p className="text-gray-400 font-manrope text-sm mt-1">
              Manage Your Perfume Collection
            </p>
          </div>

          <button
            className="w-full md:w-auto px-6 py-3 bg-[#00D4FF] text-[#020523] text-sm font-bold rounded-2xl hover:bg-[#14e1ff] transition-all shadow-lg active:scale-95"
            onClick={() => navigate("/admin/products/add")}
          >
            + Add Product
          </button>
        </div>

        {getLoad ? (
          <ProductsSkeleton layout={layout} />
        ) : (
          <>
            {/* SEARCH + VIEW TOGGLE */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 bg-[#0B1135]/50 border border-white/10 p-4 rounded-2xl shadow-inner">
                <div className="flex items-center gap-3 bg-[#0B1135] h-14 rounded-2xl border border-white/10 w-full md:w-[550px] px-5 group focus-within:border-[#00D4FF]/30 transition-all">
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
                <div className="flex justify-center gap-2 bg-[#0B1135] border border-white/10 p-1 rounded-xl">
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

            {/* LIST VIEW */}
            {layout === "list" && productsData?.products && (
              <div className="bg-[#0B1135] border border-white/10 rounded-md overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] text-left border-collapse table-fixed">
                    <thead>
                      <tr className="text-gray-400 text-[14px]  tracking-[0.1em] border-b border-white/10 bg-white/[0.01]">
                        <th className="py-5 px-6 font-manrope font-thin">Product ID</th>
                        <th className="py-5 px-6 font-manrope font-thin text-center">Product Name</th>
                        <th className="py-5 px-6 font-manrope font-thin text-center">Amount (€)</th>
                        <th className="py-5 px-6 font-manrope font-thin text-center">Stock</th>
                        <th className="py-5 px-6 font-manrope font-thin text-center">Sales</th>
                        <th className="py-5 px-6 font-manrope font-thin text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {(filteredSearch ?? productsData?.products).map((p, i) => (
                        <tr
                          key={i}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-sm"
                        >
                          <td className="py-5 px-6 text-[#FFFFFF] font-manrope text-md">
                            #{p._id.slice(-8)}
                          </td>

                          <td className="py-5 px-6 text-center">
                            <div className="flex items-center justify-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-[#020523] border border-white/10 flex items-center justify-center p-1.5 shadow-lg group-hover:border-[#00D4FF]/30 transition-all shrink-0">
                                <img
                                  src={p?.heroSection?.bgImage}
                                  alt=""
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="text-left">
                                <p className="text-[#FFFFFF]  text-sm font-manrope group-hover:text-[#00D4FF] transition-colors">
                                  {p?.heroSection?.productName}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-5 px-6  text-[#FFFFFF] text-[15px] font-manrope text-center">
                            €{p?.productDetailsSection?.price}
                          </td>

                          <td className="py-5 px-6 text-center">
                            <span className=" text-green-400 px-3 py-1 rounded-full text-[15px] font-manrope">
                              {p.stock ?? 0}
                            </span>
                          </td>

                          <td className="py-5 px-6 text-center">
                            <span className=" text-cyan-400 px-3 py-1  text-[15px] font-manrope ">
                              {p.totalSold ?? 0}
                            </span>
                          </td>

                          <td className="py-5 px-6">
                            <div className="flex justify-end gap-2.5">
                              <button
                                className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-[#00D4FF] hover:text-[#020523] transition-all active:scale-90 border border-white/10 hover:border-transparent"
                                onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                className="p-2.5 bg-red-500/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-500/10 hover:border-transparent"
                                onClick={() => handleDelete(p._id)}
                              >
                                {deletingId === p._id ? (
                                  <SmallLoader />
                                ) : (
                                  <Trash2 size={16} />
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
                        <h2 className="text-2xl font-manrope  text-white leading-tight">
                          {p?.heroSection?.productName}
                        </h2>
                      </div>

                      <p className="text-[#FFFFFF4D] text-xs font-manrope line-clamp-2 h-8 mb-6">
                        {p?.productDetailsSection?.shortDescription}
                      </p>

                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <p className="text-2xl font-manrope  text-white">
                            €{p?.productDetailsSection?.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#0DFF00]  font-manrope text-sm">
                            {p.stock ?? 0} In stock
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#FFFFFF0A] border border-white/10 py-3.5 rounded-2xl text-sm font-manrope  text-gray-300 hover:bg-[#00D4FF] hover:text-white hover:border-[#00D4FF] transition-all"
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
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
