import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalAPI from '../../../service/GlobalAPI'
import { toast } from 'sonner'

function ResumeCardItem({ resume }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  console.log("params in resumeItem", params)

  const onDelete = () => {
    setLoading(true);
    GlobalAPI.deleteResumeById(resume.userid).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      window.location.reload
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    });
  };

  return (
    <div className='transition-all transform hover:scale-105'>
      <Link to={'/dashboard/resume/' + resume.userid + "/edit"}>
        <div className='p-14 bg-gradient-to-b from-[#E6E6FA] via-[#D8BFD8] to-[#DDA0DD] h-[280px] 
          rounded-t-lg border-t-4 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:rotate-1'
          style={{ borderColor: '#E6E6FA' }}
        >
          <div className='flex items-center justify-center h-[180px]'>
            <img src="/cv.png" width={80} height={80} className="transition-opacity duration-300 ease-in-out hover:opacity-80" />
          </div>
        </div>
      </Link>

      <div className='border p-3 flex justify-between text-black rounded-b-lg shadow-lg transition-colors duration-300 ease-in-out hover:bg-[#f3e5f5]'
        style={{ background: '#FFF0F5' }}>
        <h2 className='text-sm font-semibold'>{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation('/dashboard/resume/' + resume.userid + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.userid + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.userid + "/view")}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
