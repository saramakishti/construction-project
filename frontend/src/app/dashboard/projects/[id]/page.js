'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { formatDate } from '@/utils/date';
import {
  updateProject,
  fetchProjectById,
  fetchComments,
  addComment,
} from '@/services/projectService';
import { ArrowLeft } from 'lucide-react';
import { useCurrentUser } from '@/context/UserContext';

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const loadData = async () => {
      try {
        const project = await fetchProjectById(id);
        const loadedComments = await fetchComments(id);
        if (project) {
          setProject(project);
          setEdited(project);
          setComments(loadedComments);
        }
      } catch (err) {
        console.error('Error loading project or comments:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry = {
      user: currentUser?.fullName || 'Unknown',
      role: currentUser?.role || 'User',
      text: newComment.trim(),
    };

    try {
      const saved = await addComment(id, newEntry);
      setComments((prev) => [...prev, saved]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleSave = async () => {
    try {
      const updated = await updateProject(project.id, edited);
      setProject(updated);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update project.');
    }
  };

  if (loading) {
    return <div className='p-6 text-gray-500'>Loading project...</div>;
  }

  if (!project) {
    return <div className='p-6 text-red-600'>Project not found.</div>;
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <button
        onClick={() => router.push('/dashboard/projects')}
        className='text-blue-600 hover:underline mb-6 cursor-pointer'
      >
        <span className='flex'>
          <ArrowLeft />
          Back to All Projects
        </span>
      </button>

      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold'>{project.name}</h1>
        {isAdmin && !editMode && (
          <button
            onClick={() => setEditMode(true)}
            className='text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer'
          >
            Edit Project
          </button>
        )}
      </div>

      {editMode ? (
        <div className='space-y-4'>
          {[
            { label: 'Client', key: 'client' },
            { label: 'Type', key: 'type' },
            { label: 'Status', key: 'status' },
            { label: 'Start Date', key: 'startDate', type: 'date' },
            { label: 'Deadline', key: 'deadline', type: 'date' },
            { label: 'Budget', key: 'budget' },
            { label: 'Workers', key: 'workers' },
            { label: 'Location', key: 'location' },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className='block font-medium text-gray-700 mb-1'>
                {label}
              </label>
              <input
                type={type || 'text'}
                value={
                  key === 'workers'
                    ? (edited.workers || []).join(', ')
                    : edited[key] ?? ''
                }
                onChange={(e) => {
                  const value =
                    key === 'workers'
                      ? e.target.value.split(',').map((w) => w.trim())
                      : ['budget'].includes(key)
                      ? Number(e.target.value)
                      : e.target.value;
                  setEdited((prev) => ({ ...prev, [key]: value }));
                }}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              />
            </div>
          ))}
          <div className='flex justify-end space-x-4'>
            <button
              onClick={() => setEditMode(false)}
              className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className='space-y-2 text-gray-800'>
          <p>
            <strong>Client:</strong> {project.client}
          </p>
          <p>
            <strong>Type:</strong> {project.type}
          </p>
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          <p>
            <strong>Start Date:</strong> {formatDate(project.startDate)}
          </p>
          <p>
            <strong>Deadline:</strong> {formatDate(project.deadline)}
          </p>
          <p>
            <strong>Budget:</strong> ${project.budget.toLocaleString()}
          </p>
          <p>
            <strong>Workers:</strong> {project.workers.join(', ') || 'None'}
          </p>
          <p>
            <strong>Location:</strong> {project.location}
          </p>
          <p>
            <strong>Progress:</strong> {project.progress}%
          </p>
        </div>
      )}

      <hr className='my-8' />

      <h2 className='text-2xl font-semibold mb-4'>Project Comments</h2>

      <form onSubmit={handleAddComment} className='mb-6'>
        <textarea
          rows={3}
          disabled={!currentUser}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='Write a comment...'
          className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500'
        ></textarea>
        <button
          type='submit'
          disabled={!currentUser || !newComment.trim()}
          className='mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer'
        >
          Post Comment
        </button>
      </form>

      <div className='space-y-4'>
        {comments.map((c, index) => {
          console.log('c', c);
          return (
            <div key={index} className='border-b pb-2'>
              <p className='font-semibold'>
                {c.user}{' '}
                <span className='text-sm text-gray-500'>({c.role})</span>
              </p>
              <p className='text-sm text-gray-400'>
                {c.createdAt ? formatDate(c.createdAt) : ''}
              </p>
              <p>{c.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
