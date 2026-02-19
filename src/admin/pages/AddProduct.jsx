import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useAddProductMutation, useUpdateProductMutation, useGetProductsQuery } from "../../Redux/Apis/product.Api";

const InputField = ({ label, placeholder, value, onChange, type = "text", className = "" }) => (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && <label className="text-[13px] text-[#FFFFFF] font-manrope ml-1">{label}</label>}
        <div className="bg-[#020523] border border-white/9 rounded-lg px-4 py-4 focus-within:border-[#00D4FF]/30 transition-colors">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent w-full outline-none text-white text-[14px] font-manrope placeholder:text-[#BEBEBE]"
            />
        </div>
    </div>
);

const UploadField = ({ label, value, onChange, className = "", placeholder = "Upload", multiple = false }) => (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && <label className="text-[13px] text-[#FFFFFF] font-manrope ml-1">{label}</label>}
        <label className="bg-[#020523] border border-white/9 rounded-lg px-4 py-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between group">
            <div className="flex flex-col gap-1 overflow-hidden">
                <span className={`text-[14px] font-manrope truncate ${value ? 'text-white' : 'text-[#BEBEBE]'}`}>
                    {value ? (multiple ? `${value.length} files` : (typeof value === 'string' ? "Uploaded" : value.name)) : placeholder}
                </span>
                {typeof value === 'string' && value && !multiple && (
                    <span className="text-[10px] text-gray-500 truncate">{value}</span>
                )}
            </div>
            <input
                type="file"
                multiple={multiple}
                onChange={(e) => multiple ? onChange(Array.from(e.target.files)) : onChange(e.target.files[0])}
                className="hidden"
            />
        </label>
    </div>
);

const Section = ({ title, children, className = "" }) => (
    <div className={`flex flex-col gap-3 ${className}`}>
        {title && <h3 className="text-[14px] text-[#FFFFFF] font-manrope ml-1">{title}</h3>}
        <div className="border border-white/9 rounded-xl p-6 bg-white/[0.01] flex flex-col gap-6">
            {children}
        </div>
    </div>
);

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [addProductMutation, { isLoading: addLoad }] = useAddProductMutation();
    const [updateMutation, { isLoading: updateLoad }] = useUpdateProductMutation();
    const { data: productsData } = useGetProductsQuery();

    const isLoading = addLoad || updateLoad;

    // States aligned with LATEST backend keys (POST/PUT format)
    const [gardenName, setGardenName] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantityMl, setQuantityMl] = useState("");
    const [ingredientsMain, setIngredientsMain] = useState("");
    const [stock, setStock] = useState("");

    // Description & Images Sections
    const [description1, setDescription1] = useState("");
    const [bgImage1, setBgImage1] = useState(null);
    const [description2, setDescription2] = useState("");
    const [bgImage2, setBgImage2] = useState(null);
    const [description3, setDescription3] = useState("");
    const [bgImage3, setBgImage3] = useState(null);

    // Gallery
    const [productImages, setProductImages] = useState([]);

    // Olfactive Architecture
    const [sec7Title, setSec7Title] = useState("Top Notes");
    const [sec7Ingredients, setSec7Ingredients] = useState("");
    const [sec7Description, setSec7Description] = useState("");
    const [bgImage4, setBgImage4] = useState(null);

    const [sec8Title, setSec8Title] = useState("Heart Notes");
    const [sec8Ingredients, setSec8Ingredients] = useState("");
    const [sec8Description, setSec8Description] = useState("");
    const [bgImage5, setBgImage5] = useState(null);

    const [sec9Title, setSec9Title] = useState("Base Notes");
    const [sec9Ingredients, setSec9Ingredients] = useState("");
    const [sec9Description, setSec9Description] = useState("");
    const [bgImage6, setBgImage6] = useState(null);

    // Ritual
    const [ritualSubTitle, setRitualSubTitle] = useState("");
    const [step1, setStep1] = useState("");
    const [step2, setStep2] = useState("");
    const [step3, setStep3] = useState("");

    // Landing Details
    const [theEssence, setTheEssence] = useState("");
    const [spiritualResonance, setSpiritualResonance] = useState("");
    const [olfactiveStructure, setOlfactiveStructure] = useState("");
    const [whenToWear, setWhenToWear] = useState("");
    const [comboImg, setComboImg] = useState(null);

    const [shortDescription4, setShortDescription4] = useState("");
    const [closingLine, setClosingLine] = useState("");

    // Populate data from nested GET structure
    React.useEffect(() => {
        if (isEditing && productsData?.products) {
            const p = productsData.products.find(item => item._id === id);
            if (p) {
                setProductName(p.heroSection?.productName || "");
                setGardenName(p.heroSection?.gardenName || "");
                setBgImage1(p.heroSection?.bgImage || null);
                setDescription1(p.heroSection?.description || "");

                setDescription2(p.essenceSection?.description || "");
                setBgImage2(p.essenceImageSection?.bgImage || null);

                setDescription3(p.livingSourceSection?.description || "");
                setBgImage3(p.livingSourceImageSection?.bgImage || null);

                setRitualSubTitle(p.theRitual?.ritSubtitle || "");
                setStep1(p.theRitual?.step1 || "");
                setStep2(p.theRitual?.step2 || "");
                setStep3(p.theRitual?.step3 || "");

                setQuantityMl(p.productDetailsSection?.quantityMl || "");
                setPrice(p.productDetailsSection?.price || "");
                setCategory(p.productDetailsSection?.category || "");
                setIngredientsMain(p.productDetailsSection?.ingredients?.join(", ") || "");
                setShortDescription4(p.productDetailsSection?.shortDescription || "");
                setProductImages(p.productDetailsSection?.productImages || []);
                setClosingLine(p.closingLine || "");

                setSec7Title(p.storySection1?.title || "Top Notes");
                setSec7Ingredients(p.storySection1?.ingredients || "");
                setSec7Description(p.storySection1?.description || "");
                setBgImage4(p.storySection1?.bgImage || null);

                setSec8Title(p.storySection2?.title || "Heart Notes");
                setSec8Ingredients(p.storySection2?.ingredients || "");
                setSec8Description(p.storySection2?.description || "");
                setBgImage5(p.storySection2?.bgImage || null);

                setSec9Title(p.storySection3?.title || "Base Notes");
                setSec9Ingredients(p.storySection3?.ingredients || "");
                setSec9Description(p.storySection3?.description || "");
                setBgImage6(p.storySection3?.bgImage || null);

                // Handling potential legacy keys from GET response while using latest keys for state
                setTheEssence(p.combo?.theEssence || p.combo?.theEssance || p.theEssence || "");
                setSpiritualResonance(p.combo?.spiritualResonance || p.combo?.spritualResonance || p.spiritualResonance || "");
                setOlfactiveStructure(p.combo?.olfactiveStructure || p.olfactiveStructure || "");
                setWhenToWear(p.combo?.whenToWear || p.combo?.WhenToWear || p.whenToWear || "");
                setComboImg(p.combo?.comboImg || p.comboImg || null);

                setStock(p.stock || "");
            }
        }
    }, [isEditing, id, productsData]);

    const handleAddProduct = async () => {
        // Validation Logic
        if (!productName?.trim()) return toast.error("Product name is required");
        if (!gardenName) return toast.error("Please select a garden");

        // Ensure at least one image is added (main hero image)
        if (!bgImage1 && !isEditing) return toast.error("Hero Image (bgImage1) is required");

        // Validate number fields
        const numPrice = Number(price);
        const numQuantity = Number(quantityMl);
        const numStock = Number(stock);

        if (isNaN(numPrice) || numPrice <= 0) return toast.error("Please enter a valid price");
        if (isNaN(numQuantity) || numQuantity <= 0) return toast.error("Please enter a valid quantity in ML");
        if (stock !== "" && (isNaN(numStock) || numStock < 0)) return toast.error("Please enter a valid stock level");

        try {
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("gardenName", gardenName);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("quantityMl", quantityMl);
            formData.append("ingredientsMain", ingredientsMain);
            formData.append("stock", stock);

            formData.append("description1", description1 || description2 || description3 || productName);
            formData.append("description2", description2 || description1 || description3 || productName);
            formData.append("description3", description3 || description2 || description1 || productName);

            formData.append("sec7Title", sec7Title);
            formData.append("sec7Ingredients", sec7Ingredients);
            formData.append("sec7Description", sec7Description);

            formData.append("sec8Title", sec8Title);
            formData.append("sec8Ingredients", sec8Ingredients);
            formData.append("sec8Description", sec8Description);

            formData.append("sec9Title", sec9Title);
            formData.append("sec9Ingredients", sec9Ingredients);
            formData.append("sec9Description", sec9Description);

            formData.append("ritualSubTitle", ritualSubTitle);
            formData.append("step1", step1);
            formData.append("step2", step2);
            formData.append("step3", step3);

            formData.append("theEssence", theEssence);
            formData.append("spiritualResonance", spiritualResonance);
            formData.append("olfactiveStructure", olfactiveStructure);
            formData.append("whenToWear", whenToWear);
            formData.append("shortDescription4", shortDescription4);
            formData.append("closingLine", closingLine);

            if (bgImage1 instanceof File) formData.append("bgImage1", bgImage1);
            if (bgImage2 instanceof File) formData.append("bgImage2", bgImage2);
            if (bgImage3 instanceof File) formData.append("bgImage3", bgImage3);
            if (bgImage4 instanceof File) formData.append("bgImage4", bgImage4);
            if (bgImage5 instanceof File) formData.append("bgImage5", bgImage5);
            if (bgImage6 instanceof File) formData.append("bgImage6", bgImage6);
            if (comboImg instanceof File) formData.append("comboImg", comboImg);

            if (productImages && productImages.length > 0) {
                productImages.forEach((img) => {
                    if (img instanceof File) {
                        formData.append("productImages", img);
                    }
                });
            }

            let result;
            if (isEditing) {
                result = await updateMutation({ id, body: formData }).unwrap();
            } else {
                result = await addProductMutation(formData).unwrap();
            }

            if (result?.success) {
                toast.success(isEditing ? "Product Updated Successfully!" : "Product Added Successfully!");
                navigate("/admin/products");
            } else {
                toast.error(result?.message || "Operation failed");
            }
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen text-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="page-header-title">{isEditing ? "Edit Product" : "Add New Product"}</h1>
                        <p className="text-gray-400 font-manrope text-sm mt-1">{isEditing ? "Modify your existing perfume details" : "Create a new product for your collection"}</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <Icon icon="material-symbols:arrow-back-rounded" width="24" height="24" />
                        <span>Back to Products</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-8 bg-[#0B1135] border border-white/10 rounded-md p-4 md:p-10">
                    <div className="flex flex-col gap-6">
                        {/* Top Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-[13px] text-[#FFFFFF] font-manrope ml-1">Select Garden</label>
                                <div className="relative bg-[#020523] border border-white/9 rounded-lg px-4 py-4">
                                    <select
                                        value={gardenName}
                                        onChange={(e) => setGardenName(e.target.value)}
                                        className="bg-transparent w-full outline-none text-white text-[14px] font-manrope appearance-none cursor-pointer"
                                    >
                                        <option className="text-black" value="">Select</option>
                                        <option className="text-black" value="wisdom">Wisdom</option>
                                        <option className="text-black" value="strength">Strength</option>
                                        <option className="text-black" value="harmony">Harmony</option>
                                        <option className="text-black" value="perfection">Perfection</option>
                                        <option className="text-black" value="divine consciousness">Divine Consciousness</option>
                                    </select>

                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <Icon icon="lucide:chevron-down" width="16" />
                                    </div>
                                </div>
                            </div>
                            <InputField
                                label="Product Name"
                                placeholder="e.g Mahakali essence"
                                value={productName}
                                onChange={setProductName}
                            />
                            <InputField
                                label="Subtext For Hero"
                                placeholder="e.g A petal of serene"
                                value={category}
                                onChange={setCategory}
                            />
                        </div>

                        {/* Description & Images Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <UploadField label="Hero Image" value={bgImage1} onChange={setBgImage1} placeholder="Upload" />
                            <InputField label="The Essence" placeholder="Enter" value={description2} onChange={setDescription2} />
                            <UploadField label="Second Image" value={bgImage2} onChange={setBgImage2} placeholder="Upload" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="The Living Source" placeholder="Enter" value={description3} onChange={setDescription3} />
                            <UploadField label="Third Image" value={bgImage3} onChange={setBgImage3} placeholder="Upload" />
                            <div className="hidden md:block" />
                        </div>

                        {/* Olfactive Architecture Section */}
                        <Section title="The Olfactive Architecture">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <p className="text-[14px] text-white/70 font-manrope ml-1">The First Breath</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                        <InputField placeholder="Ingredients" value={sec7Ingredients} onChange={setSec7Ingredients} />
                                        <InputField placeholder="Description" value={sec7Description} onChange={setSec7Description} />
                                        <UploadField placeholder="Image" value={bgImage4} onChange={setBgImage4} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <p className="text-[14px] text-white/70 font-manrope ml-1">The Heart Awakens</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                        <InputField placeholder="Ingredients" value={sec8Ingredients} onChange={setSec8Ingredients} />
                                        <InputField placeholder="Description" value={sec8Description} onChange={setSec8Description} />
                                        <UploadField placeholder="Image" value={bgImage5} onChange={setBgImage5} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <p className="text-[14px] text-white/70 font-manrope ml-1">The Eternal Trace</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                        <InputField placeholder="Ingredients" value={sec9Ingredients} onChange={setSec9Ingredients} />
                                        <InputField placeholder="Description" value={sec9Description} onChange={setSec9Description} />
                                        <UploadField placeholder="Image" value={bgImage6} onChange={setBgImage6} />
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* The Ritual Section */}
                        <Section title="The Ritual">
                            <div className="flex flex-col gap-6">
                                <InputField label="Heading" placeholder="Enter" value={ritualSubTitle} onChange={setRitualSubTitle} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="Step 1" placeholder="Enter" value={step1} onChange={setStep1} />
                                    <InputField label="Step 2" placeholder="Enter" value={step2} onChange={setStep2} />
                                    <InputField label="Step 3" placeholder="text" value={step3} onChange={setStep3} />
                                </div>
                            </div>
                        </Section>

                        {/* Pricing and Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="Quantity" placeholder="e.g 100 ml" value={quantityMl} onChange={setQuantityMl} />
                            <InputField label="Price" placeholder="Enter" value={price} onChange={setPrice} />
                            <InputField label="Subtext For End" placeholder="Enter" value={shortDescription4} onChange={setShortDescription4} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <UploadField label="Other Images" multiple={true} value={productImages} onChange={setProductImages} placeholder="Upload" />
                            <InputField label="Closing Line" placeholder="Enter" value={closingLine} onChange={setClosingLine} />
                            <InputField label="Stock" placeholder="E.g 200" value={stock} onChange={setStock} />
                        </div>

                        {/* Landing Page Details */}
                        <Section title="Landing Page Section">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <UploadField label="Product Image" value={comboImg} onChange={setComboImg} placeholder="Upload" />
                                <InputField label="The Essence" placeholder="Enter" value={theEssence} onChange={setTheEssence} />
                                <InputField label="Spiritual Resonance" placeholder="Enter" value={spiritualResonance} onChange={setSpiritualResonance} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Olfactive Structure" placeholder="Enter" value={olfactiveStructure} onChange={setOlfactiveStructure} />
                                <InputField label="When To Wear" placeholder="Enter" value={whenToWear} onChange={setWhenToWear} />
                            </div>
                        </Section>

                        {/* Submit Button */}
                        {/* <div className="flex justify-center pt-8 pb-12 border-t border-white/10">
                            <button
                                onClick={handleAddProduct}
                                disabled={isLoading}
                                className="w-full md:w-auto px-8 md:px-24 py-4 md:py-5 bg-white text-[#020523] font-manrope font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98] shadow-lg"
                            >
                                {isLoading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Product" : "Add Product")}
                            </button>
                        </div> */}
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
            </div>
        </div>
    );
};

export default AddProduct;
