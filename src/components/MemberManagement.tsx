import { useState } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import { Member } from '../types';

interface MemberManagementProps {
    members: Member[];
    onAddMember: (name: string) => Promise<void>;
    onRemoveMember: (id: string) => Promise<void>;
}

export function MemberManagement({ members, onAddMember, onRemoveMember }: MemberManagementProps) {
    const [newMemberName, setNewMemberName] = useState('');
    const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

    const handleAdd = async () => {
        if (!newMemberName.trim()) return;
        await onAddMember(newMemberName);
        setNewMemberName('');
    };

    const handleRemove = async (id: string) => {
        await onRemoveMember(id);
        setMemberToDelete(null);
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" /> Gestión de Familia
            </h2>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Nuevo integrante..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button
                    onClick={handleAdd}
                    disabled={!newMemberName.trim()}
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <UserPlus className="w-6 h-6" />
                </button>
            </div>
            <div className="space-y-2">
                {members.length === 0 && <p className="text-gray-500 text-center py-4 bg-white rounded-lg border border-dashed">La lista está vacía.</p>}
                {members.map(member => (
                    <div key={member.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all">
                        {memberToDelete === member.id ? (
                            <div className="flex items-center justify-between bg-red-50 p-2 rounded -m-2 animate-in slide-in-from-right-2">
                                <span className="text-sm text-red-800 font-medium truncate max-w-[150px]">¿Borrar a {member.name}?</span>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => setMemberToDelete(null)} className="px-3 py-1 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100">No</button>
                                    <button onClick={() => handleRemove(member.id)} className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded hover:bg-red-700 shadow-sm">Sí</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center group">
                                <span className="font-medium text-lg text-gray-700">{member.name}</span>
                                <button onClick={() => setMemberToDelete(member.id)} className="text-gray-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
