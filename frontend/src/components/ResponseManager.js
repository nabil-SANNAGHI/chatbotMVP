import React from 'react';
import { useResponseManager } from '../hooks/useResponseManager';
import Button from './Button';
import Input from './Input';
import ScrollableContainer from './ScrollableContainer';
import ErrorMessage from '../error/ErrorMessage';

const ResponseManager = () => {
    const {
        responses,
        keywords,
        setKeywords,
        response,
        setResponse,
        isLoading,
        error,
        edit,
        handleEdit,
        handleAddResponse,
        handleDeleteRespense,
        handleUpdateResponse
    } = useResponseManager();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Response Manager</h1>

                {/* Response List */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-700">Existing Responses:</h2>
                    <ScrollableContainer className="mt-4 max-h-64 border border-gray-200 rounded-lg bg-gray-50">
                        {responses.length === 0 ? (
                            <p className="p-4 text-gray-500 text-center">No responses available.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {responses.map((res) => (
                                    <li key={res.id} className="p-4 flex justify-between">
                                        <div className='flex flex-col'>
                                            <span className="font-semibold text-gray-800">
                                                Keywords: <span className="text-gray-600">{res.keywords}</span>
                                            </span>
                                            <span className="text-gray-800">
                                                Response: <span className="text-gray-600">{res.response}</span>
                                            </span>

                                        </div>
                                        <div className='flex flex-col'>
                                            <button className='text-center py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition w-16 h-8' onClick={() => handleDeleteRespense(res.id)}>delete</button>
                                            <button className='text-center py-1 mt-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition w-16 h-8' onClick={() => handleEdit(res.id, res.keywords, res.response)}>edit</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ScrollableContainer>

                </div>

                {/* Error Message */}
                <ErrorMessage error={error} />

                {/* Add a new response form or edit response form */}
                <form onSubmit={!edit ? handleAddResponse : (e) => handleUpdateResponse(e, edit)} className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-700">
                        {edit ? 'Edit:' : 'Add a New Response:'}

                    </h2>
                    <div className="mt-4 grid gap-4">
                        <Input
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Enter keywords (comma-separated)"
                            disabled={isLoading}
                        />
                        <Input
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Enter response message"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Button
                            isLoading={isLoading}
                            disabled={isLoading}
                            className="w-24 h-12"
                        >
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResponseManager;