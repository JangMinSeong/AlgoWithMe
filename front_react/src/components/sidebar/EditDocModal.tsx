import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState<string>();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4" onClick={onClose}>
            <div
                className="bg-white p-8 rounded-xl shadow-2xl space-y-6 transform transition-all duration-300 scale-100 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
                style={{zIndex:10000}}>
                <h3 className="text-lg font-semibold text-center text-gray-900">페이지 제목 수정</h3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="새 제목 입력..."
                />
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border rounded-lg text-gray-600 border-gray-400 hover:border-gray-500 hover:text-black transition-colors duration-150"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => onSave(title)}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>

    );
};

export default EditModal;
