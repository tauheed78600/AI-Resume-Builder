import { PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalAPI from '../../../service/GlobalAPI';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume({ open, setOpen, selectedTemplate }) {
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log("seletected template", selectedTemplate)

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeid: uuid,
        useremail: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        themeColor: '#000000',
        templateId: selectedTemplate.id,
      },
    };

    GlobalAPI.createNewResume(data)
      .then((res) => {
        console.log('Response in addresume:', res);
        setLoading(false);
        setOpen(false);
        navigate(`/dashboard/resume/${res.data.userid}/edit`);
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error creating resume:', error.response ? error.response.data : error.message);
        setError('Failed to create resume. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            Add Title for your new Resume
            <Input
              className="mt-2 my-2"
              placeholder="Ex. Full Stack Resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </DialogDescription>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-5">
            <Button onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button disabled={!resumeTitle || loading} onClick={onCreate}>
              {loading ? <Loader2 className="animate-spin" /> : 'Create'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddResume;