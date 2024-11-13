import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalAPI from '../../../../../service/GlobalAPI';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetails({ enablenext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);
    const [openLinks, setOpenLinks] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        number: '',
        email: '',
        links: []
    });
    const [loading, setLoading] = useState(false);
    const [linkInputsVisible, setLinkInputsVisible] = useState({});

    const linkOptions = [
        'LinkedIn', 'GitHub', 'Website', 'Instagram', 'Facebook', 'Medium', 'ORCID', 'Skype', 'Discord', 'Dribbble',
        'Behance', 'Stack Overflow', 'GitLab', 'Quora', 'WeChat', 'Hugging Face', 'Kaggle', 'YouTube', 'TikTok', 
        'Signal', 'Telegram', 'WhatsApp', 'PayPal', 'Product Hunt', 'ArtStation', 'CodePen', 'Fiverr', 'Hashnode', 
        'Pluralsight', 'ResearchGate', 'IMDb', 'Qwiklabs', 'Google Play', 'Tumblr', 'Tripadvisor', 'Yelp', 'Slack', 
        'Flickr', 'ReverbNation', 'DeviantArt', 'Vimeo', 'Reddit', 'Pinterest', 'Blogger', 'Spotify', 'Bitcoin', 
        'App Store', 'WordPress', 'LeetCode', 'CodeChef', 'Codecademy', 'Codeforces', 'VSCO', 'Snapchat', 'Upwork', 
        'GeeksforGeeks', 'Google Scholar', 'LINE', 'TryHackMe', 'Coursera', 'Proton Mail', 'HackerEarth', 'Codewars', 
        'Hack The Box', 'Bitbucket', 'Gitea', 'Xing', '500px', 'dev.to', 'HackerRank', 'Tencent QQ', 'Ethereum', 
        'StopStalk', 'Toptal', 'Polywork', 'Replit', 'Credly', 'Figma', 'Gmail', 'Tableau', 'npm', 'HackerOne', 
        'Freelancer', 'DataCamp', 'Mastodon', 'Letterboxd', 'Zoom', 'Audioboom', 'SoundCloud', 'Soundcharts', 
        'KakaoTalk', 'Salesforce', 'Itch.io', 'Sololearn', 'OpenSea', 'Devpost', 'Linktree', 'CodinGame', 'Coding Ninjas', 
        'Unsplash', 'Indeed', 'Handshake', 'Steam', 'Google', 'Calendly', 'AngelList', 'Deezer', 'FlowCV', 'Khan Academy', 
        'Udemy', 'Udacity', 'Twitch', 'Trello', 'Evernote', 'Canva', 'Etsy', 'Google Maps', 'Google Podcasts', 
        'Apple Podcasts', 'Stitcher', 'Amazon Music', 'iHeartRadio', 'TuneIn', 'Pocket Casts', 'Pandora', 'YouTube Music', 
        'Tidal', 'Bandcamp', 'Scopus'
    ];

    const handleInputChange = (e) => {
        enablenext(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };

    const handleLinkChange = (e, linkType) => {
        const { value } = e.target;
        setFormData((prevFormData) => {
            const updatedLinks = [...prevFormData.links];
            const existingIndex = updatedLinks.findIndex(link => link.name === linkType);

            if (existingIndex > -1) {
                updatedLinks[existingIndex].link = value;
            } else {
                updatedLinks.push({ name: linkType, link: value });
            }

            return {
                ...prevFormData,
                links: updatedLinks
            };
        });

        setResumeInfo((prevResumeInfo) => {
            const updatedLinks = [...prevResumeInfo.links];
            const existingIndex = updatedLinks.findIndex(link => link.name === linkType);

            if (existingIndex > -1) {
                updatedLinks[existingIndex].link = value;
            } else {
                updatedLinks.push({ name: linkType, link: value });
            }

            return {
                ...prevResumeInfo,
                links: updatedLinks
            };
        });
    };

    const toggleLinkInputVisibility = (link) => {
        setLinkInputsVisible((prevState) => ({
            ...prevState,
            [link]: !prevState[link]
        }));
    };

    useEffect(() => {
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo.firstName || '',
                lastName: resumeInfo.lastName || '',
                jobTitle: resumeInfo.jobTitle || '',
                address: resumeInfo.address || '',
                number: resumeInfo.number || '',
                email: resumeInfo.email || '',
                links: resumeInfo.links || []
            });
        }
    }, [resumeInfo]);

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const linksData = Object.keys(linkInputsVisible).filter(key => linkInputsVisible[key]).map(linkName => {
            return {
                name: linkName,
                link: formData.links.find(l => l.name === linkName)?.link || '',
            };
        });
    
        const dataToSend = {
            ...formData,
            links: linksData,
        };

        GlobalAPI.updateResumeDetail(params.resumeid, dataToSend)
            .then(resp => {
                enablenext(true);
                setLoading(false);
                toast("Details Saved");
            })
            .catch(error => {
                console.error("API call error:", error);
                setLoading(false);
                toast.error("Failed to save details");
            });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 max-w-2xl mx-auto'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with basic information</p>
            <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                        <div>
                            <label className='text-sm'>First Name</label>
                            <Input name="firstName" value={formData.firstName} required onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='text-sm'>Last Name</label>
                            <Input name="lastName" value={formData.lastName} required onChange={handleInputChange} />
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Job Title</label>
                            <Input name="jobTitle" value={formData.jobTitle} required onChange={handleInputChange} />
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Address</label>
                            <Input name="address" value={formData.address} required onChange={handleInputChange} />
                        </div>
                        <div >
                            <label className='text-sm'>Phone Number</label>
                            <Input name="number" value={formData.number} required onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='text-sm'>Email</label>
                            <Input name="email" value={formData.email} required onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='flex flex-wrap mt-3'>
                <a href='#' onClick={(e) => { e.preventDefault(); setOpenLinks(!openLinks); }}>Add Links?</a>
                {openLinks && (
                    <div className='mt-2'>
                        <div className="flex flex-wrap gap-3">
                            {(viewAll ? linkOptions : linkOptions.slice(0, 15)).map((link, index) => (
                                <div key={index} className="flex-1 min-w-[100px] my-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={(e) => { e.preventDefault(); toggleLinkInputVisibility(link); }}
                                        className="w-full"
                                    >
                                        + {link}
                                    </Button>
                                    {linkInputsVisible[link] && (
                                        <Input
                                            value={formData.links.find(l => l.name === link)?.link || ''}
                                            onChange={(e) => handleLinkChange(e, link)}
                                            placeholder={`Enter ${link} link`}
                                            className="mt-2 w-full"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        {!viewAll && (
                            <Button
                                variant="outline"
                                onClick={(e) => { e.preventDefault(); setViewAll(true); }}
                                className="mt-3"
                            >
                                View All
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <div className='mt-3'>
                <Button type="submit" disabled={loading}>
                    {loading ? <LoaderCircle className="animate-spin" /> : 'Save Details'}
                </Button>
            </div>
        </form>
    </div>
);
}

export default PersonalDetails;
