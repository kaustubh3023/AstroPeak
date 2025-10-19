import { useState, useEffect } from 'react';
import { Calendar, User, Clock, Star, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import ThreeBackground from './3d/ThreeBackground';

interface UserProfile {
  name: string;
  dateOfBirth: string;
  age: number;
  zodiacSign: string;
}

// Function to calculate zodiac sign
const getZodiacSign = (dob: string): string => {
  const date = new Date(dob);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

  return '';
};

// Function to calculate age
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({ name: '', dateOfBirth: '', age: 0, zodiacSign: '' });
  const [tempProfile, setTempProfile] = useState<UserProfile>({ name: '', dateOfBirth: '', age: 0, zodiacSign: '' });
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const uid = localStorage.getItem('uid');

  // Fetch profile from backend
  useEffect(() => {
    if (!uid) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/${uid}`);
        if (res.ok) {
          const data = await res.json();
          const profileFromServer = {
            name: data.name || '',
            dateOfBirth: data.dob || '',  // 👈 using dob field
            age: data.age ? parseInt(data.age) : 0,
            zodiacSign: data.zodiacSign || ''
          };
          setProfile(profileFromServer);
          setTempProfile(profileFromServer);
          localStorage.setItem('userProfile', JSON.stringify(profileFromServer));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchProfile();
  }, [uid]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!uid) return;
    const updated = {
      ...tempProfile,
      age: calculateAge(tempProfile.dateOfBirth),
      zodiacSign: getZodiacSign(tempProfile.dateOfBirth)
    };

    try {
      const res = await fetch(`/api/users/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updated.name,
          age: updated.age.toString(),
          dob: updated.dateOfBirth,  // ✅ fixed key from dateOfBirth → dob
          zodiacSign: updated.zodiacSign
        })
      });

      if (res.ok) {
        setProfile(updated);
        setIsEditing(false);
        localStorage.setItem('userProfile', JSON.stringify(updated));
        toast({ title: "Success", description: "Profile updated!" });
      } else {
        toast({ title: "Failed", description: "Could not update profile." });
      }
    } catch (err) {
      toast({ title: "Error", description: "An error occurred while updating." });
    }
  };

  const getZodiacEmoji = (sign: string) => {
    const zodiacMap: Record<string, string> = {
      Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
      Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
      Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓"
    };
    return zodiacMap[sign] || '';
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-6 px-2 bg-mystic-navy overflow-hidden relative">
      {/* 3D Particles Background */}
      <ThreeBackground />
      {/* 3D Chakras (vertical column, centered) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 z-0 pointer-events-none" style={{height: '60vh'}}>
        {[
          '#ff1744', // Root (red)
          '#ff9100', // Sacral (orange)
          '#fff700', // Solar Plexus (yellow)
          '#00e676', // Heart (green)
          '#2979ff', // Throat (blue)
          '#7c4dff', // Third Eye (indigo)
          '#e040fb', // Crown (violet)
        ].map((color, i) => (
          <span
            key={i}
            className="rounded-full shadow-2xl"
            style={{
              width: '22px',
              height: '22px',
              background: color,
              boxShadow: `0 0 18px 6px ${color}99, 0 0 40px 10px ${color}33`,
              opacity: 0.7,
              margin: '0 auto',
            }}
          />
        ))}
      </div>
      {/* Remove astrology glyphs background here */}
      <div className="w-full max-w-md mx-auto z-10">
        <div className="bg-mystic-navy/95 p-4 rounded-2xl shadow-2xl border border-astro-gold/60 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-3xl hover:border-astro-gold/90 max-h-[90vh] overflow-auto">
          {/* Greeting */}
          <h2 className="text-xl font-bold text-astro-gold mb-1 text-center">
            {profile.name ? `Welcome back, ${profile.name}!` : 'Welcome to your cosmic profile!'}
          </h2>
          {/* Remove the cosmic message here */}
          <hr className="w-2/3 border-astro-gold/40 mb-4" />
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-astro-gold/80 to-mystic-navy/80 flex items-center justify-center mb-4 shadow-lg border-4 border-astro-gold/60">
            {/* Placeholder icon */}
            <span className="text-4xl text-astro-gold">👤</span>
          </div>
          {/* Name */}
          <h2 className="text-lg font-bold text-astro-gold mb-1 text-center">{profile.name || <span className="text-gray-400">Your Name</span>}</h2>
          {/* Profile Info */}
          <div className="w-full flex flex-col gap-2 mb-4">
            {/* Date of Birth */}
            <div className="flex flex-col items-center">
              <span className="text-astro-gold font-semibold text-sm">Date of Birth</span>
              {isEditing ? (
                <Input
                  className="mt-1 bg-mystic-navy/60 border border-astro-gold text-white focus:ring-astro-gold focus:border-astro-gold w-40 text-center text-sm"
                  type="date"
                  value={tempProfile.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              ) : (
                <span className="mt-1 text-white text-sm">
                  {profile.dateOfBirth
                    ? new Date(profile.dateOfBirth).toLocaleDateString()
                    : <span className="text-gray-400">Not set</span>}
                </span>
              )}
            </div>
            {/* Age */}
            <div className="flex flex-col items-center">
              <span className="text-astro-gold font-semibold text-sm">Age</span>
              <span className="mt-1 text-white text-sm">{profile.age ? `${profile.age} years` : <span className="text-gray-400">Not calculated</span>}</span>
            </div>
            {/* Zodiac Sign */}
            <div className="flex flex-col items-center">
              <span className="text-astro-gold font-semibold text-sm">Zodiac Sign</span>
              <span className="mt-1 text-white text-sm">
                {profile.zodiacSign
                  ? <span>{getZodiacEmoji(profile.zodiacSign)} {profile.zodiacSign}</span>
                  : <span className="text-gray-400">Not set</span>
                }
              </span>
            </div>
          </div>
          {/* Edit/Save Buttons */}
          <div className="flex gap-2 w-full justify-center mb-4">
            {!isEditing ? (
              <Button className="bg-astro-gold text-mystic-navy font-bold hover:bg-yellow-400 transition w-24 text-sm" onClick={handleEdit}><Edit size={14} className="mr-1" /> Edit</Button>
            ) : (
              <>
                <Button className="bg-astro-gold text-mystic-navy font-bold hover:bg-yellow-400 transition w-24 text-sm" onClick={handleSave}><Save size={14} className="mr-1" /> Save</Button>
                <Button className="bg-transparent border-2 border-astro-gold text-astro-gold font-bold hover:bg-astro-gold hover:text-mystic-navy transition w-24 text-sm" onClick={handleCancel}><X size={14} className="mr-1" /> Cancel</Button>
              </>
            )}
          </div>
          {/* Fun Fact Section */}
          <div className="w-full bg-mystic-navy/80 border-t border-astro-gold/30 pt-2 mt-1 rounded-b-2xl text-center">
            <span className="text-astro-gold font-semibold text-sm">Did you know?</span>
            <p className="text-white mt-1 text-xs">
              {profile.zodiacSign === 'Aries' && 'Aries are known for their courage and leadership!'}
              {profile.zodiacSign === 'Taurus' && 'Taurus is famous for loyalty and a love of comfort.'}
              {profile.zodiacSign === 'Gemini' && 'Geminis are adaptable and quick-witted communicators.'}
              {profile.zodiacSign === 'Cancer' && 'Cancers are deeply intuitive and caring souls.'}
              {profile.zodiacSign === 'Leo' && 'Leos shine bright with confidence and creativity!'}
              {profile.zodiacSign === 'Virgo' && 'Virgos are detail-oriented and love to help others.'}
              {profile.zodiacSign === 'Libra' && 'Libras value harmony, balance, and beauty.'}
              {profile.zodiacSign === 'Scorpio' && 'Scorpios are passionate and fiercely loyal.'}
              {profile.zodiacSign === 'Sagittarius' && 'Sagittarius is adventurous and loves to explore.'}
              {profile.zodiacSign === 'Capricorn' && 'Capricorns are disciplined and ambitious achievers.'}
              {profile.zodiacSign === 'Aquarius' && 'Aquarius is innovative and values individuality.'}
              {profile.zodiacSign === 'Pisces' && 'Pisces are imaginative and deeply empathetic.'}
              {!profile.zodiacSign && 'Astrology connects us to the universe—discover your sign for a fun fact!'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
