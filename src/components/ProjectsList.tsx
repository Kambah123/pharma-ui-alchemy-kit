import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../hooks/use-auth';

export default function ProjectsList() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from('projects')
      .select('id, name, molecule, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setProjects(data || []);
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;
  if (loading) return <div className="p-4">Loading projects...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">Your Projects</h2>
      {projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.id} className="border rounded p-2">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">Molecule: {p.molecule}</div>
              <div className="text-xs text-gray-500">Status: {p.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 