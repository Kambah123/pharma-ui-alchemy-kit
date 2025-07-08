import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

interface Project {
  id: string;
  name: string;
  molecule: string;
  therapeutic_area: string;
  differentiators: string[];
  status: string;
  created_at: string;
}

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setProject(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!project) return <div className="p-8">Project not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button className="mb-4 text-blue-600 underline" onClick={() => router.push('/dashboard')}>
        &larr; Back to Dashboard
      </button>
      <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
        <div className="mb-2 text-gray-700">Molecule(s): <b>{project.molecule}</b></div>
        <div className="mb-2 text-gray-700">Therapeutic Area: <b>{project.therapeutic_area}</b></div>
        <div className="mb-2 text-gray-700">Key Differentiators: <b>{project.differentiators.join(', ')}</b></div>
        <div className="mb-2 text-gray-500 text-sm">Status: {project.status}</div>
        <div className="mb-6 text-gray-400 text-xs">Created: {new Date(project.created_at).toLocaleString()}</div>

        {/* TODO: Integrate OpenAI for brand name/slogan generation */}
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Brand Name Suggestions</h2>
          <ul className="list-disc ml-6 text-gray-800">
            <li>Brandex</li>
            <li>Pharmalux</li>
            <li>Medigen</li>
          </ul>
          {/* TODO: Replace with AI-generated names */}
        </section>
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Slogan Suggestions</h2>
          <ul className="list-disc ml-6 text-gray-800">
            <li>Empowering Health, Inspiring Trust</li>
            <li>Innovation for Life</li>
          </ul>
          {/* TODO: Replace with AI-generated slogans, add Bengali translation */}
        </section>
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Leaflet Draft</h2>
          <div className="border p-2 rounded bg-gray-50 text-gray-700">
            {/* TODO: Integrate AI-generated leaflet content */}
            <p>This is a sample leaflet draft for {project.name}.</p>
          </div>
        </section>
        {/* TODO: Add tabs for Branding, Literature, Data Viz */}
        {/* TODO: Add ExportButton for PDF/DOCX download */}
        {/* TODO: Add compliance check logic */}
      </div>
    </div>
  );
} 