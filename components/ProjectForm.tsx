import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

interface ProjectFormProps {
  onSuccess?: () => void;
}

export default function ProjectForm({ onSuccess }: ProjectFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [molecule, setMolecule] = useState('');
  const [therapeuticArea, setTherapeuticArea] = useState('');
  const [differentiators, setDifferentiators] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.from('projects').insert({
      user_id: user.id,
      name,
      molecule,
      therapeutic_area: therapeuticArea,
      differentiators: differentiators.split(',').map(s => s.trim()),
      status: 'draft',
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setName('');
      setMolecule('');
      setTherapeuticArea('');
      setDifferentiators('');
      if (onSuccess) onSuccess();
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-md mx-auto flex flex-col gap-3 bg-white">
      <h2 className="text-lg font-bold mb-2">Create New Brand Project</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Molecule(s)"
        value={molecule}
        onChange={e => setMolecule(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Therapeutic Area"
        value={therapeuticArea}
        onChange={e => setTherapeuticArea(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Key Differentiating Benefits (comma separated)"
        value={differentiators}
        onChange={e => setDifferentiators(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      {/* TODO: Add clinical paper upload (Supabase Storage) */}
      <div className="text-xs text-gray-500">Clinical Paper upload coming soon.</div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Creating...' : 'Create Project'}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Project created!</div>}
    </form>
  );
} 