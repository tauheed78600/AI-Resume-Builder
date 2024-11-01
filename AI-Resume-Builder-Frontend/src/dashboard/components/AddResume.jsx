import { PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalAPI from '../../../service/GlobalAPI';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigate(); 

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {title: resumeTitle,
      resumeid: uuid,
      useremail: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,}
    };

    GlobalAPI.createNewResume(data)
      .then(res => {
        console.log('Response:', res);
        setLoading(false);
        setOpenDialog(false);
        navigation("/dashboard/resume/"+uuid+"/edit")
      })
      .catch(error => {
        console.error('Error creating resume:', error.response ? error.response.data : error.message);
        setError('Failed to create resume. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div>
      <div
        className='p-10 w-[250px] py-24 border-items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-ease-in-out hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogTrigger></DialogTrigger>
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
            {error && <p className='text-red-500'>{error}</p>}
            <div className='flex justify-end gap-5'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
              <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
