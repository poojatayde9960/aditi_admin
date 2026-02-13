
import React, { useState } from 'react';
import giftsimg from '../../../public/mdi_gift.png';
import { Search, Plus, Pencil, Trash2, LayoutGrid, List, X } from 'lucide-react';
import { useAddGiftsMutation, useDeleteGiftsMutation, useGetGiftsQuery, useUpdateGiftsMutation } from '../../Redux/Apis/giftsApi';
import { useForm } from 'react-hook-form';

const Gifts = () => {
    const { data, isLoading, isError, error } = useGetGiftsQuery();
    const [addGift, { isLoading: isAdding, isError: isAddError, error: addError }] =
        useAddGiftsMutation();
    const [deleteGift, { isLoading: isDeleting, isError: isDeleteError, error: deleteError }] =
        useDeleteGiftsMutation();
    const [updateGift, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
        useUpdateGiftsMutation();
    const [editGift, setEditGift] = useState(null);

    const { register, handleSubmit, reset, setValue } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const [activeModal, setActiveModal] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    const gifts = data?.gifts || [];

    const onSubmit = async (formData) => {
        try {
            if (editGift) {
                // 🔁 UPDATE
                await updateGift({
                    id: editGift._id,
                    GiftName: formData.GiftName,
                    Giftvalue: Number(formData.Giftvalue),
                }).unwrap();
            } else {
                // ➕ ADD
                await addGift({
                    GiftName: formData.GiftName,
                    Giftvalue: Number(formData.Giftvalue),
                }).unwrap();
            }

            reset();
            setEditGift(null);
            setActiveModal(null);
        } catch (err) {
            console.error(err);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this gift?')) return;

        try {
            await deleteGift(id).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (gift) => {
        setEditGift(gift);
        setActiveModal('gift');

        setValue('GiftName', gift.GiftName);
        setValue('Giftvalue', gift.Giftvalue);
    };
    const filteredGifts = gifts.filter((gift) =>
        gift.GiftName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ✅ SKELETONS (layout SAME)
    const GridSkeleton = () => (
        <div className="bg-[#0a102b] border border-gray-800 rounded-3xl p-6 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-5">
                <div className="h-10 w-10 bg-gray-700 rounded-xl" />
                <div>
                    <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                    <div className="h-3 w-20 bg-gray-700 rounded" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="h-9 w-9 bg-gray-700 rounded-xl" />
                <div className="h-9 w-9 bg-gray-700 rounded-xl" />
            </div>
        </div>
    );

    const ListSkeleton = () => (
        <tr className="animate-pulse border-b border-gray-800/50">
            <td className="p-4"><div className="h-3 w-20 bg-gray-700 rounded" /></td>
            <td className="p-4"><div className="h-3 w-32 bg-gray-700 rounded" /></td>
            <td className="p-4"><div className="h-3 w-16 bg-gray-700 rounded" /></td>
            <td className="p-4"><div className="h-3 w-12 bg-gray-700 rounded" /></td>
            <td className="p-4"><div className="h-3 w-12 bg-gray-700 rounded" /></td>
            <td className="p-4"><div className="h-8 w-20 bg-gray-700 rounded" /></td>
        </tr>
    );

    return (
        <div className="min-h-screen lg:ml-20 bg-[#05091d] text-white p-4 md:p-5 font-sans">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold">Gifts</h1>
                    <p className="text-gray-400 text-sm">Manage Your Gift Collection</p>
                </div>
                <button
                    onClick={() => setActiveModal('gift')}
                    className="bg-[#00c2ff] hover:bg-[#00a8dd] text-white font-bold py-2 px-6 rounded-xl flex items-center gap-2 transition-all"
                >
                    <Plus size={18} /> Add Gift
                </button>
            </div>

            {/* --- SEARCH & TOGGLE BAR --- */}
            <div className="flex items-center justify-between bg-[#0a102b] p-3 rounded-xl border border-gray-800 mb-8">
                <div className="relative w-full bg-[#020523] rounded-xl max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search Product"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-3 border-none focus:ring-0 text-sm pl-10 text-gray-300 bg-transparent"
                    />

                </div>
                <div className="flex gap-2 bg-[#1a2245] p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[#00c2ff]/20 text-[#00c2ff]' : 'text-gray-500'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[#00c2ff]/20 text-[#00c2ff]' : 'text-gray-500'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* --- ERROR --- */}
            {isError && (
                <div className="mb-6 text-red-400 bg-red-500/10 border border-red-500 p-4 rounded-xl">
                    {error?.data?.message || 'Something went wrong'}
                </div>
            )}

            {/* --- CONDITIONAL VIEW --- */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => <GridSkeleton key={i} />)
                        : filteredGifts.map((gift) => (
                            <div key={gift._id} className="bg-[#0a102b] border border-gray-800 rounded-3xl p-6 flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <img src={giftsimg} className="h-10" alt="" />
                                    <div>
                                        <h3 className="text-xl font-medium">{gift.GiftName}</h3>
                                        <p className="text-gray-400 mt-1">₹ {gift.Giftvalue}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleEdit(gift)}
                                        className="p-2.5 bg-[#1a2245] border border-gray-700 rounded-xl"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(gift._id)}
                                        disabled={isDeleting}
                                        className="p-2.5 bg-[#1a2245] border border-gray-700 rounded-xl text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <div className="overflow-x-auto bg-[#0a102b] border border-gray-800 rounded-2xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                <th className="p-4">Product ID</th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Stock</th>
                                {/* <th className="p-4">Sales</th> */}
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading
                                ? Array.from({ length: 5 }).map((_, i) => <ListSkeleton key={i} />)
                                : filteredGifts.map((gift) => (
                                    <tr key={gift._id} className="border-b border-gray-800/50 hover:bg-white/5">
                                        <td className="p-4 font-mono">{gift._id}</td>
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={giftsimg} className="h-6" alt="" />
                                            {gift.GiftName}
                                        </td>
                                        <td className="p-4">₹ {gift.Giftvalue}</td>
                                        <td className="p-4 text-[#22FF00]">{gift.count}</td>
                                        {/* <td className="p-4">{gift.count}</td> */}
                                        <td className="p-4 flex gap-2">
                                            <Pencil
                                                size={16}
                                                className="cursor-pointer"
                                                onClick={() => handleEdit(gift)}
                                            />

                                            <Trash2
                                                size={16}
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => handleDelete(gift._id)}
                                            />

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- ADD NEW GIFT POPUP --- */}
            {activeModal === 'gift' && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-[#0a102b] p-10 rounded-[40px] w-full max-w-md relative"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-8"
                        >
                            <X />
                        </button>

                        <h2 className="text-2xl mb-8">
                            {editGift ? 'Update Gift' : 'Add New Gift'}
                        </h2>


                        <div className="mb-6">
                            <label className="text-sm text-gray-300">Gift Name</label>
                            <input
                                {...register('GiftName', { required: true })}
                                className="w-full p-4 rounded-xl bg-[#05091d] mt-2"
                                placeholder="Gift name"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="text-sm text-gray-300">Gift Value</label>
                            <input
                                {...register('Giftvalue', { required: true })}
                                className="w-full p-4 rounded-xl bg-[#05091d] mt-2"
                                placeholder="Gift value"
                            />
                        </div>

                        {isAddError && (
                            <p className="text-red-400 mb-4">
                                {addError?.data?.message || 'Failed to add gift'}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isAdding || isUpdating}
                            className="bg-[#00c2ff] w-full py-3 rounded-xl font-bold"
                        >
                            {isUpdating
                                ? 'Updating...'
                                : isAdding
                                    ? 'Adding...'
                                    : editGift
                                        ? 'Update Gift'
                                        : '+ Add Gift'}
                        </button>
                        {(isAddError || isUpdateError) && (
                            <p className="text-red-400 mb-4">
                                {addError?.data?.message ||
                                    updateError?.data?.message ||
                                    'Something went wrong'}
                            </p>
                        )}

                    </form>
                </div>
            )}
        </div>
    );
};

export default Gifts;
