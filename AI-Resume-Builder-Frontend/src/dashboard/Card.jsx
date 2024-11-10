import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import resumeTemplates from './resume/components/preview/templates';
import AddResume from './components/AddResume';
import { useNavigate } from 'react-router-dom';

function Card({ title, buttonTitle, description }) {
  const [onOpen, setOnOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openAddResume, setOpenAddResume] = useState(false);
  const navigate = useNavigate();

  const onSubmit = () => {
    if (title === "Resume") {
      setOnOpen(true);
    }
  };

  const onTemplateClick = (template) => {
    setSelectedTemplate(template);
    setOpenAddResume(true);
  };

  return (
    <div className="max-w-xs p-4 bg-white rounded-3xl shadow-md transform transition-all hover:scale-105 hover:shadow-lg duration-300">
      <div className="relative bg-gradient-to-r from-purple-200 to-lavender-200 p-6 rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <button
          className="py-2 px-6 bg-gradient-to-r from-purple-600 to-lavender-500 text-white font-semibold rounded-full hover:bg-purple-700 transition-all duration-300"
          onClick={onSubmit}
        >
          {buttonTitle}
        </button>
      </div>

      <Dialog open={onOpen} onOpenChange={setOnOpen}>
        <DialogContent className="w-800 h-700 max-w-full max-h-full p-0">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-center font-bold text-4xl">
                Select a Resume Template
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="flex justify-center text-xl">
                Choose a template to create your resume
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-6 p-6 max-h-full overflow-auto">
            {resumeTemplates.map((template) => (
              <div
                key={template.id}
                className="w-xs p-4 bg-white rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 cursor-pointer"
                onClick={() => onTemplateClick(template)} // Call onTemplateClick when clicked
              >
                <img
                  src={template.image}
                  alt={template.id}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-center font-semibold">{template.name}</h3>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {selectedTemplate && (
        <AddResume
          open={openAddResume}
          setOpen={setOpenAddResume}
          selectedTemplate={selectedTemplate}
        />
      )}
    </div>
  );
}

export default Card;
