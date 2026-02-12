import React, { useState } from "react";
import { Search, Grid3X3, List, Pencil, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";
// import bg from "../../../public/bg.png"
// import bg from "../../../public/bg1.png"
import bg1 from "/bg1.png";
import bg from "/bg.jpg";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../Redux/Apis/product.Api";
import Loader from "../components/Loader";
import { MdSearch } from "react-icons/md";
import SmallLoader from "../components/SmallLoader";
import { toast } from "react-toastify";
const Products = () => {
  const [layout, setLayout] = useState("grid");

  // States to add form
  const [name, setName] = useState("");
  const [garden, setGarden] = useState("");
  const [price, setPrice] = useState("");
  const [sizeMl, setSizeMl] = useState("");
  const [stock, setStock] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [ingredients, setIngredients] = useState("");
  // const [notes, setNotes] = useState("");
  const [descriptionImg, setDescriptionImg] = useState(null);
  const [showImg, setShowImg] = useState(null);
  const [bottleImg, setBottleImg] = useState(null);
  const [discount, setDiscount] = useState("");
  const [topNotes, setTopNotes] = useState("");
  const [baseNotes, setBaseNotes] = useState("");
  const [heartNotes, setHeartNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredSearch, setFilteredSearch] = useState();

  // Other states
  const [addProductModal, setAddProductModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null)

  // Queries and Mutations
  const [addProductMutation, { isLoading }] = useAddProductMutation();
  const { data: productsData, isLoading: getLoad } = useGetProductsQuery();
  const [deleteMutation, { isLoading: deleteLoad }] =
    useDeleteProductMutation()
  const [updateMutation, { isLoading: updateLoad }] =
    useUpdateProductMutation()

  console.log("productsData", productsData);

  const handleAddProduct = async () => {
    if (!isEditing) {
      if (
        !name ||
        !price ||
        !sizeMl ||
        !stock ||
        !descriptionText ||
        !ingredients ||
        !discount ||
        !bottleImg ||
        !descriptionImg ||
        !topNotes ||
        !baseNotes ||
        !heartNotes ||
        !garden
      ) {
        return toast.error("All Fields are required!");
      }
    } else {
      if (!name || !price || !sizeMl || !stock || !descriptionText || !garden) {
        return toast.error("Please fill required fields before updating!");
      }
    }

    if (descriptionText && descriptionText.length > 1000) {
      return toast.error("Description Text Limit Exceeded!!");
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("sizeMl", sizeMl);
      formData.append("stock", stock);
      formData.append("descriptionText", descriptionText);
      formData.append("ingredients", ingredients);
      formData.append("discount", discount);
      formData.append("garden", garden);

      if (bottleImg) formData.append("bottleImg", bottleImg);
      if (descriptionImg) formData.append("descriptionImg", descriptionImg);
      if (showImg) formData.append("showImg", showImg);

      const notesObject = {
        top: topNotes ? topNotes.split(",").map((s) => s.trim()) : [],
        mid: heartNotes ? heartNotes.split(",").map((s) => s.trim()) : [],
        base: baseNotes ? baseNotes.split(",").map((s) => s.trim()) : [],
      };
      formData.append("notes", JSON.stringify(notesObject));

      let result;

      if (isEditing) {
        result = await updateMutation({
          id: editProductId,
          body: formData,
        }).unwrap();

        if (result?.success) {
          toast.success("Product Updated Successfully!");
        } else {
          toast.error(result?.message || "Update failed");
        }
      } else {
        result = await addProductMutation(formData).unwrap();

        if (result?.success === true) {
          toast.success("Product Added Successfully!");
        } else {
          toast.error(result?.message || "Failed to add product");
        }

        setName("");
        setPrice("");
        setSizeMl("");
        setStock("");
        setDescriptionText("");
        setIngredients("");
        setDiscount("");
        setTopNotes("");
        setHeartNotes("");
        setBaseNotes("");
        setGarden("");
        setBottleImg(null);
        setDescriptionImg(null);
        setShowImg(null);
      }

      setAddProductModal(false);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteMutation(id).unwrap();

      console.log("delete result →", res);

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

  const openEditModal = (p) => {
    setIsEditing(true);
    setEditProductId(p._id);

    setName(p.name);
    setGarden(p.garden);
    setPrice(p.price);
    setSizeMl(p.sizeMl);
    setStock(p.stock);
    setIngredients(p.ingredients);
    setDescriptionText(p.description?.text || "");
    setDiscount(p.discount || "");

    setTopNotes(p.notes?.top?.join(", ") || "");
    setHeartNotes(p.notes?.mid?.join(", ") || "");
    setBaseNotes(p.notes?.base?.join(", ") || "");

    setBottleImg(null);
    setDescriptionImg(null);
    setShowImg(null);

    setAddProductModal(true);
  };

  const handleSearch = (text) => {
    if (!text) {
      setFilteredSearch(null);
      return;
    }

    const results = productsData?.products?.filter((item) =>
      item?.name?.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredSearch(results);
  };

  return (
    <div className="p-2 bg-[#020523] mt-5 lg:ml-23 min-h-screen text-white">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="-mt-8">
          <h1 className="text-3xl font-manrope">Products</h1>
          <p className="text-gray-400 font-manrope  text-xs mt-1">
            Manage Your Perfume Collection
          </p>
        </div>

        <button
          className="px-6 py-3 bg-[#00D4FF] -mt-7 text-[#FFFFFF] text-sm  rounded-xl hover:bg-[#14e1ff] transition"
          onClick={() => {
            setIsEditing(false);
            setEditProductId(null);

            setName("");
            setGarden("");
            setPrice("");
            setSizeMl("");
            setStock("");
            setIngredients("");
            setDescriptionText("");
            setDiscount("");
            setTopNotes("");
            setHeartNotes("");
            setBaseNotes("");

            setBottleImg(null);
            setDescriptionImg(null);
            setShowImg(null);

            setAddProductModal(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* SEARCH + VIEW TOGGLE */}
      <div>
        <div className="flex justify-between items-center mt-5 bg-[#0b1135] p-2 rounded-xl">
          <div className="flex items-center gap-3 bg-[#020523] h-10 rounded-md border border-white/10 w-[400px]">
            <Search
              size={18}
              className="text-gray-400 ml-5 cursor-pointer"
              onClick={() => handleSearch(searchText.trim())}
            />

            <input
              type="text"
              placeholder="Search Product"
              className="bg-transparent outline-none text-sm w-full"
              value={searchText}
              onChange={(e) => {
                const value = e.target.value;
                setSearchText(value);
                handleSearch(value.trim());
              }}
            />
          </div>

          {/* Toggle */}
          <div className="flex gap-3 border border-[#FFFFFF12] p-1 rounded-xl">
            {/* GRID BUTTON */}
            <button
              onClick={() => setLayout("grid")}
              className={`px-2 py-1.5 rounded-lg border ${layout === "grid"
                ? "bg-[#FFFFFF12] border-[#141a3a] text-[#00D4FF]"
                : "bg-[#141a3a] border-[#141a3a] text-[#FFFFFF3B]"
                }`}
            >
              <Icon icon="mynaui:grid" width="18" height="18" />
            </button>

            {/* LIST BUTTON */}
            <button
              onClick={() => setLayout("list")}
              className={`px-2 py-1.5 rounded-lg border ${layout === "list"
                ? "bg-[#FFFFFF12] border-[#141a3a] text-[#00D4FF]"
                : "bg-[#141a3a] border-[#141a3a] text-[#FFFFFF3B]"
                }`}
            >
              <Icon icon="vaadin:lines-list" width="18" height="18" />
            </button>
          </div>
        </div>
      </div>

      {getLoad && <Loader />}

      {/* LIST VIEW */}
      {layout === "list" && (
        <div className="mt-10 bg-[#0b1135] border border-white/10 rounded-3xl overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="text-gray-400 text-sm border-b border-white/10">
              <tr>
                <th className="py-4 px-4 sm:px-6">Product ID</th>
                <th className="py-4 px-4 sm:px-6">Product Name</th>
                <th className="py-4 px-4 sm:px-6">Amount</th>
                <th className="py-4 px-4 sm:px-6">Stock</th>
                <th className="py-4 px-4 sm:px-6">Action</th>
              </tr>
            </thead>

            <tbody>
              {(filteredSearch ?? productsData?.products) &&
                (filteredSearch ?? productsData?.products).map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="py-3 px-4 sm:py-5 sm:px-6 text-white">
                      #{p._id.slice(0, 6)}
                    </td>

                    <td className="py-3 px-4 sm:py-5 sm:px-6 flex items-center gap-2 sm:gap-4">
                      <img
                        src={p.bottleImg}
                        alt=""
                        className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-xl bg-white/10 p-1 sm:p-2"
                      />
                      <span className="text-white font-manrope text-sm sm:text-base">
                        {p?.name}
                      </span>
                    </td>

                    <td className="py-3 px-4 sm:py-5 sm:px-6 font-manrope text-sm sm:text-base">
                      {p.price}
                    </td>
                    <td className="py-3 px-4 sm:py-5 sm:px-6 text-green-400 text-sm sm:text-base">
                      {p.stock}
                    </td>

                    <td className="py-3 px-4 sm:py-5 sm:px-6 flex gap-2 sm:gap-3">
                      <button
                        className="p-1 sm:p-2 bg-[#00d2ff]/20 rounded-lg hover:bg-[#00d2ff]/30"
                        onClick={() => openEditModal(p)}
                      >
                        <Pencil size={16} className="text-[#00d2ff]" />
                      </button>
                      <button
                        className="p-1 sm:p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30"
                        onClick={() => handleDelete(p._id)}
                      >
                        {deletingId === p._id ? (
                          <SmallLoader />
                        ) : (
                          <Trash2 size={16} className="text-red-500" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}


      {/* GRID VIEW */}
      {layout === "grid" && (
        <div className="mt-5 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filteredSearch ?? productsData?.products)?.map((p, i) => (
            <div
              key={i}
              className="bg-[#0B1135]  rounded-3xl p-6 flex flex-col shadow-[0_0_25px_rgba(0,0,0,0.25)]"
            >
              {/* PRODUCT IMAGE */}
              <div
                className={`
    w-full text-center
    h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px]
    flex items-center justify-center 
    overflow-hidden relative
    bg-cover bg-center
    mx-auto
    sm:mx-0 sm:w-72
  `}
              // style={{
              //   backgroundImage: `url(${bg})`,
              // }}
              >
                {/* Main Product Image */}
                <img
                  src={p?.bottleImg}
                  alt=""
                  className={`
      relative z-10 
      h-[60%] sm:h-[70%]  md:h-[75%] lg:h-[80%]
      object-contain
      drop-shadow-2xl lg:ml-15
    `}
                />
              </div>



              {/* PRODUCT INFO */}
              <div className="mt-6">
                <h2 className="text-3xl font-manrope  leading-tight">
                  {p?.name}
                </h2>
                <p className="text-gray-400 text-xs mt-1 font-manrope truncate max-w-[250px]">
                  {p?.description?.text}
                </p>


                <div className="flex justify-between items-center mt-4">
                  <p className="text-md font-manrope ">{p.amount}</p>
                  <p className="text-[#0DFF00] font-manrope  text-base font-medium">
                    {p.stock} In stock
                  </p>
                </div>
              </div>

              {/* EDIT + DELETE SECTION */}
              <div className="flex items-center gap-4 mt-3">
                {/* Edit button */}
                <button
                  onClick={() => openEditModal(p)}
                  className="flex items-center justify-center gap-2 flex-1 bg-[#FFFFFF1C] py-3 rounded-2xl text-gray-300 hover:bg-white/10 transition"
                >
                  <Icon icon="mynaui:edit" width="18" height="18" />
                  Edit
                </button>

                {/* Delete button */}
                <button
                  className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30"
                  onClick={() => handleDelete(p._id)}
                >
                  {deletingId === p._id ? (
                    <SmallLoader />
                  ) : (
                    <Trash2 size={28} className="text-red-500" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product */}

      {addProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[6px]"
            onClick={() => setAddProductModal(false)}
          ></div>

          <div
            className="
        relative z-50 
        w-[90%] max-w-[1200px] 
        max-h-[90vh] overflow-y-auto
        bg-[#0F1629] 
        border border-[#1f2539]
        rounded-2xl 
        p-10 shadow-2xl
        text-white
    "
          >
            <h2 className="text-3xl font-semibold mb-6">Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-sm opacity-70">Product Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3 text-sm focus:outline-none"
                    placeholder="e.g Mahakali essence"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm opacity-70">sizeMl</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3 text-sm focus:outline-none"
                    placeholder="Enter"
                    value={sizeMl}
                    onChange={(e) => setSizeMl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm opacity-70">ingredients</label>
                  <input
                    type="text"
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3 text-sm focus:outline-none"
                    placeholder="Enter"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm opacity-70">discount</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3 text-sm focus:outline-none"
                    placeholder="Enter"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm opacity-70">Price</label>
                    <input
                      className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                      placeholder="$520"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-sm opacity-70">Stock</label>
                    <input
                      className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                      placeholder="100"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm opacity-70">Top Notes</label>
                  <input
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                    placeholder="Enter"
                    value={topNotes}
                    onChange={(e) => setTopNotes(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm opacity-70">Base Notes</label>
                  <input
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                    placeholder="Enter"
                    value={baseNotes}
                    onChange={(e) => setBaseNotes(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm opacity-70">Heart Notes</label>
                  <input
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                    placeholder="Enter"
                    value={heartNotes}
                    onChange={(e) => setHeartNotes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm opacity-70">Garden</label>
                  <input
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                    placeholder="Enter"
                    value={garden}
                    onChange={(e) => setGarden(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm opacity-70">Description</label>
                  <textarea
                    rows="6"
                    className="w-full mt-1 bg-[#131A2D] border border-[#29304A] rounded-lg px-4 py-3"
                    placeholder="Enter Product Description"
                    value={descriptionText}
                    onChange={(e) => setDescriptionText(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div
                  className="
  border-2 border-dashed border-[#2C3551] rounded-xl h-[300px]
  flex flex-col items-center justify-center gap-4 bg-[#131A2D]
  hover:border-[#00D4FF] hover:bg-[#0F1629] transition-all cursor-pointer group
"
                >
                  {/* If image exists → show preview */}
                  {bottleImg ? (
                    <div className="flex  flex-col items-center gap-3">
                      <img
                        src={URL.createObjectURL(bottleImg)}
                        alt="Bottle Preview"
                        className="h-40 w-40 object-cover rounded-lg shadow-lg"
                      />

                      <label
                        htmlFor="bottleUpload"
                        className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg text-sm 
        hover:opacity-90 transition cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <>
                      {/* Default view when no image selected */}
                      <div className="text-gray-400 group-hover:text-[#00D4FF] text-4xl transition">
                        📷
                      </div>

                      <label
                        htmlFor="bottleUpload"
                        className="px-6 py-2 bg-[#1B233A] text-white rounded-lg text-sm
        group-hover:bg-[#00D4FF] group-hover:text-black transition cursor-pointer"
                      >
                        Upload Bottle Image
                      </label>

                      <p className="text-xs text-gray-500 group-hover:text-gray-300 transition">
                        JPG, PNG, WEBP — Max 5MB
                      </p>
                    </>
                  )}

                  {/* Hidden Input */}
                  <input
                    id="bottleUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setBottleImg(e.target.files[0])}
                  />
                </div>

                <div
                  className="border-2 border-dashed border-[#2C3551] rounded-xl h-[300px] 
  flex flex-col items-center justify-center gap-4 bg-[#131A2D]
  hover:border-[#00D4FF] hover:bg-[#0F1629] transition-all cursor-pointer group"
                >
                  {/* If image selected → show preview */}
                  {descriptionImg ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={URL.createObjectURL(descriptionImg)}
                        alt="Description Preview"
                        className="h-40 w-40 object-cover rounded-lg shadow-lg"
                      />

                      <label
                        htmlFor="descriptionUpload"
                        className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg text-sm
        hover:opacity-90 transition cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <>
                      {/* Default icon when no image */}
                      <div className="text-gray-400 group-hover:text-[#00D4FF] text-4xl transition">
                        📷
                      </div>

                      {/* Upload Label */}
                      <label
                        htmlFor="descriptionUpload"
                        className="px-6 py-2 bg-[#1B233A] text-white rounded-lg text-sm
        group-hover:bg-[#00D4FF] group-hover:text-black transition cursor-pointer"
                      >
                        Upload Image
                      </label>

                      {/* Helper text */}
                      <p className="text-xs text-gray-500 group-hover:text-gray-300 transition">
                        JPG, PNG, WEBP — Max 5MB
                      </p>
                    </>
                  )}

                  {/* Hidden File Input */}
                  <input
                    id="descriptionUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setDescriptionImg(e.target.files[0])}
                  />
                </div>

                <div
                  className="border-2 border-dashed border-[#2C3551] rounded-xl h-[300px] 
  flex flex-col items-center justify-center gap-4 bg-[#131A2D]
  hover:border-[#00D4FF] hover:bg-[#0F1629] transition-all cursor-pointer group"
                >
                  {/* Agar image selected hai toh preview dikhao */}
                  {showImg ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        // Check if it's a File object (for new uploads) or a String (from API during edit)
                        src={typeof showImg === 'string' ? showImg : URL.createObjectURL(showImg)}
                        alt="Show Preview"
                        className="h-40 w-40 object-cover rounded-lg shadow-lg"
                      />

                      <label
                        htmlFor="showImgUpload" // Unique ID
                        className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg text-sm
        hover:opacity-90 transition cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-400 group-hover:text-[#00D4FF] text-4xl transition">
                        📷
                      </div>

                      <label
                        htmlFor="showImgUpload" // Unique ID
                        className="px-6 py-2 bg-[#1B233A] text-white rounded-lg text-sm
        group-hover:bg-[#00D4FF] group-hover:text-black transition cursor-pointer"
                      >
                        Upload Show Image
                      </label>

                      <p className="text-xs text-gray-500 group-hover:text-gray-300 transition">
                        JPG, PNG, WEBP — Max 5MB
                      </p>
                    </>
                  )}

                  {/* Hidden File Input with Unique ID */}
                  <input
                    id="showImgUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setShowImg(e.target.files[0])}
                  />
                </div>


              </div>
            </div>

            <button
              onClick={() => setAddProductModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex justify-center">
              <button
                onClick={handleAddProduct}
                disabled={isLoading}
                className="
    mt-6 w-full md:w-auto px-10 py-3
    bg-gradient-to-r from-[#00D4FF] to-[#0077FF]
    text-white text-lg font-medium
    rounded-xl shadow-lg
    hover:opacity-90 active:scale-95 transition
    disabled:opacity-50 disabled:cursor-not-allowed
  "
              >
                {isEditing
                  ? updateLoad
                    ? "Updating..."
                    : "Update Product"
                  : isLoading
                    ? "Adding..."
                    : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
