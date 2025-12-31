import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Trash2, CheckCircle, Circle, LogOut, LayoutGrid, Calendar } from 'lucide-react';
import { Button } from '../components/Button';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            if (data.success) {
                setTasks(data.data);
            }
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoadingTasks(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const { data } = await api.post('/tasks', { title, description });
            if (data.success) {
                setTasks([...tasks, data.data]);
                setTitle('');
                setDescription('');
                toast.success('Task created successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to create task');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            const { data } = await api.delete(`/tasks/${id}`);
            if (data.success) {
                setTasks(tasks.filter(t => t._id !== id));
                toast.success('Task deleted');
            }
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
            if (data.success) {
                setTasks(tasks.map(t => t._id === task._id ? data.data : t));
                toast.success(`Task ${newStatus}`);
            }
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <LayoutGrid className="text-white" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">My Dashboard</h1>
                        <p className="text-slate-400">
                            Hello, <span className="text-white font-semibold">{user?.name}</span>
                        </p>
                    </div>
                </div>
                <Button onClick={logout} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    <LogOut size={18} /> Sign Out
                </Button>
            </header>

            {/* Create Task Card */}
            <div className="card-glass rounded-2xl p-6 md:p-8 mb-10 border-t-4 border-t-indigo-500">
                <h3 className="text-xl font-bold text-white mb-6">Create New Task</h3>
                <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-1 w-full">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            className="input-control h-14 text-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-[1.5] w-full">
                        <input
                            type="text"
                            placeholder="Add Details (Optional)"
                            className="input-control h-14 text-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="primary" loading={submitLoading} className="h-14 md:w-auto w-full px-8">
                        <Plus size={20} /> Add Task
                    </Button>
                </form>
            </div>

            {/* Task Board Header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">Task Board</h2>
                <div className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-semibold border border-slate-700">
                    {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
                </div>
            </div>

            {/* Task Grid */}
            {loadingTasks ? (
                <div className="text-center py-20">
                    <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 animate-pulse">Syncing your tasks...</p>
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LayoutGrid className="text-slate-500" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">All Caught Up!</h3>
                    <p className="text-slate-400">You have no pending tasks. Add one to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className={`group relative bg-slate-900/40 backdrop-blur-sm border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between ${task.status === 'completed' ? 'opacity-80' : ''}`}
                        >
                            {/* Status Stripe */}
                            <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-lg transition-colors duration-300 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 group-hover:bg-indigo-500'}`}></div>

                            <div>
                                <div className="flex justify-between items-start mb-4 pl-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${task.status === 'completed'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {task.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(task)}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                            title={task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                                        >
                                            {task.status === 'completed' ? <Circle size={18} /> : <CheckCircle size={18} className="text-emerald-500" />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="pl-4">
                                    <h3 className={`text-xl font-bold text-white mb-2 ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                                        {task.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        {task.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pl-4 pt-4 mt-auto border-t border-white/5 flex items-center gap-2 text-xs text-slate-500">
                                <Calendar size={14} />
                                <span>{new Date(task.createdAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
