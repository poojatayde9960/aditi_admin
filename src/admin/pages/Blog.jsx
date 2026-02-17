import React, { useState } from 'react';
import flower from '../../../public/flower.jpg';
import {
    Search,
    Download,
    Plus,
    FileText,
    Pencil,
    Trash2,
    X,
} from 'lucide-react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Icon } from "@iconify/react";
import {
    useAddBlogsMutation,
    useDeleteBlogsMutation,
    useGetBlogsQuery,
    useUpdateBlogsMutation,
} from '../../Redux/Apis/blogsApi';

const Blog = () => {
    const { data, isLoading } = useGetBlogsQuery();
    const [addBlog, { isLoading: isAdding }] = useAddBlogsMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogsMutation();

    const [deleteBlog] = useDeleteBlogsMutation();

    const [searchQuery, setSearchQuery] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const isSubmitting = isAdding || isUpdating;

    // form state
    const [form, setForm] = useState({
        headline: '',
        subheadline: '',
        description: '',
        mainImage: null,
        otherImages: [],
    });

    const blogs = data?.blog || [];

    // ================= HANDLERS =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleMainImage = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm(prev => ({ ...prev, mainImage: file }));
        }
    };

    const handleOtherImages = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setForm(prev => ({ ...prev, otherImages: files }));
        }
    };

    const handleSubmit = async () => {
        const fd = new FormData();
        fd.append('headline', form.headline);
        fd.append('subheadline', form.subheadline);
        fd.append('description', form.description);

        if (form.mainImage) {
            fd.append('mainImage', form.mainImage);
        }
        for (let pair of fd.entries()) {
            console.log(pair[0], pair[1]);
        }
        form.otherImages.forEach((img) => {
            fd.append('otherImages', img);
        });

        try {
            if (isEditMode) {
                await updateBlog({ id: editId, data: fd }).unwrap(); // unwrap for error handling
                alert("Blog updated successfully!");
            } else {
                await addBlog(fd).unwrap();
                alert("Blog added successfully!");
            }

            // Reset modal & form
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditId(null);
            setForm({
                headline: '',
                subheadline: '',
                description: '',
                mainImage: null,
                otherImages: [],
            });

        } catch (error) {
            console.error(error);
            alert(
                error?.data?.message || "Something went wrong. Please try again."
            );
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleEdit = (blog) => {
        setIsEditMode(true);
        setEditId(blog._id);

        setForm({
            headline: blog.headline,
            subheadline: blog.subheadline,
            description: blog.description,
            mainImage: null,       // file dubara select karna padega
            otherImages: [],
        });

        setIsModalOpen(true);
    };


    const handleDelete = async (id) => {
        //  Confirm before delete
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );
        if (!confirmDelete) return;
        try {
            //  Call delete API
            await deleteBlog(id).unwrap();

            //  Success alert
            alert("Blog deleted successfully!");
        } catch (error) {
            //  Error alert
            console.error(error);
            alert(
                error?.data?.message ||
                "You do not have permission to delete this blog."
            );
        }
    };


    // ================= UI =================
    return (
        <div className="min-h-screen bg-[#020523] text-white relative">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="page-header-title">Blogs</h1>
                    <p className="text-gray-400 text-sm">
                        Manage Your Blogs Add & Delete Anytime
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#00c2ff] px-4 py-2 rounded-lg flex gap-2 items-center"
                >
                    <Plus size={18} /> Add Blog
                </button>
            </div>

            {/* ================= MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
                    <div className="bg-[#0a102b] w-full max-w-2xl rounded-3xl p-8 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4"
                        >
                            <X />
                        </button>

                        <h2 className="text-xl mb-6">
                            {isEditMode ? 'Update Blog' : 'Add New Blog'}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <input
                                name="headline"
                                value={form.headline}
                                onChange={handleChange}
                                placeholder="Headline"
                                className="bg-[#05091d] border border-gray-800 rounded-xl px-4 py-3"
                            />
                            <input
                                name="subheadline"
                                value={form.subheadline}
                                onChange={handleChange}
                                placeholder="Subheadline"
                                className="bg-[#05091d] border border-gray-800 rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Images */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <label className="border border-dashed rounded-xl p-4 cursor-pointer block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleMainImage}
                                />
                                <span className="text-gray-400 flex gap-2">
                                    <Icon icon="basil:image-solid" /> Main Image
                                </span>
                            </label>


                            <label className="border border-dashed rounded-xl p-4 cursor-pointer block">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleOtherImages}
                                />
                                <span className="text-gray-400 flex gap-2">
                                    <Icon icon="basil:image-solid" /> Other Images
                                </span>
                            </label>

                        </div>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={4}
                            className="w-full bg-[#05091d] border border-gray-800 rounded-xl px-4 py-3 mb-6"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-[#00c2ff] w-full py-3 rounded-xl font-bold disabled:opacity-50"
                        >
                            {isSubmitting
                                ? 'Please wait...'
                                : isEditMode
                                    ? 'Update Blog'
                                    : '+ Add Blog'}
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col bg-[#FFFFFF0A] p-3 rounded-2xl md:flex-row gap-4 mb-8"> <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="text" placeholder="Search" className="w-[400px] max-w-full bg-[#0a102b] border border-gray-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00c2ff]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
                <button className="flex items-center justify-center gap-2 bg-[#1a2245] border border-gray-700 px-4 py-2 rounded-lg text-gray-300 hover:bg-[#252d58] transition-all"> <Download size={18} /> Export </button>
            </div>
            {/* ================= BLOG GRID ================= */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {filteredBlogs.map((item) => (
                        <div
                            key={item._id}
                            className="bg-[#0B1135] border border-white/5 rounded-[2rem] p-6 group hover:border-[#00D4FF]/30 transition-all duration-300"
                        >
                            {/* IMAGES CONTAINER */}
                            <div className="relative h-64 mb-6 rounded-2xl overflow-hidden group">
                                <div className="flex gap-2 h-full">
                                    <div className="flex-[3] overflow-hidden">
                                        <img
                                            src={item.mainImage?.url || flower}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 grid grid-rows-3 gap-2">
                                        {item.otherImages?.slice(0, 3).map((img) => (
                                            <img
                                                key={img._id}
                                                src={img.url}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* TEXT CONTENT */}
                            <h3 className="blog-headline-title mb-2 text-[#FFFFFF]">
                                {item.headline}
                            </h3>
                            <p className=" text-sm  text-[#FFFFFF4D] font-manrope line-clamp-2 h-10 mb-6">
                                {item.description}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex justify-between items-center">
                                <button className="flex items-center gap-3 text-white text-sm font-medium group transition-colors">
                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#00D4FF] group-hover:border-[#00D4FF] transition-all">
                                        <Icon icon="solar:alt-arrow-right-linear" className="text-lg" />
                                    </div>
                                    Read More
                                </button>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-[#1a2245] border border-gray-700 px-4 py-2 rounded-xl text-gray-300 hover:bg-[#252d58] transition-all flex items-center gap-2 text-sm"
                                    >
                                        <Pencil size={16} /> Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;
