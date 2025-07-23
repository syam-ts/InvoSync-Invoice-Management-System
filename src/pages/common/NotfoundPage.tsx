import { FileQuestion, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 mt-22 h-[40rem] backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-gray-600/20 to-slate-700/20 p-8 border-b border-white/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl flex items-center justify-center shadow-lg">
                                    <FileQuestion className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        404 Error
                                    </h2>
                                    <p className="text-gray-400">This page could not be found</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-2xl border border-red-500/30">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="font-semibold">Not Found</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-6">
                            <div className="text-8xl font-bold text-white/20 select-none">
                                404
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">
                                    Oops! Page Not Found
                                </h3>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                                    The page you are looking for might have been removed, had its
                                    name changed, or is temporarily unavailable. Don't worry, it
                                    happens to the best of us!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-slate-700/5 rounded-3xl pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
