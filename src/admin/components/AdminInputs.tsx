import React, { useState, useRef } from 'react';
import { 
  Plus, 
  X, 
  Upload, 
  Loader2, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

// --- Image Upload Component ---
interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  maxSizeKB?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  label, 
  value, 
  onChange, 
  bucket = 'assets', 
  folder = 'uploads',
  maxSizeKB = 500
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (500kb as requested)
    if (file.size > maxSizeKB * 1024) {
      setError(`File too large. Max ${maxSizeKB}KB allowed.`);
      return;
    }
    setError(null);

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error('Upload Error:', err);
      setError('Upload failed. Check bucket permissions.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">{label}</label>
        {value && (
          <button 
            type="button" 
            onClick={() => onChange('')} 
            className="text-[8px] font-black uppercase tracking-widest text-spot-red hover:underline mb-1"
          >
            Clear Artifact
          </button>
        )}
      </div>
      
      <div className="relative group">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden" 
          accept="image/*" 
        />
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`relative h-56 rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden bg-slate-50/50 ${
            value ? 'border-transparent shadow-inner' : 'border-black/5 hover:border-spot-red'
          }`}
        >
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-spot-charcoal/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <Upload className="text-white" size={24} />
                <span className="text-white font-black uppercase tracking-widest text-[10px]">Replace Artifact</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-6 text-spot-charcoal/20 group-hover:text-spot-red group-hover:scale-110 transition-all">
                {isUploading ? <Loader2 className="animate-spin text-spot-red" size={32} /> : <ImageIcon size={32} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Select Project Cover</span>
              <span className="text-[8px] font-bold text-spot-charcoal/20 mt-2 uppercase tracking-[0.2em]">Max Size: {maxSizeKB}KB</span>
            </>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-spot-red border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-spot-red animate-pulse">Encoding DNA...</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 text-[10px] font-black text-spot-red uppercase px-6 py-3 bg-red-50 rounded-2xl border border-red-100"
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste external image URL..."
          className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 text-[10px] font-mono text-spot-charcoal/60 focus:outline-none focus:border-spot-red transition-all"
        />
        {value && value.startsWith('http') && (
           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
              <CheckCircle2 size={16} />
           </div>
        )}
      </div>
    </div>
  );
};

// --- Interactive Tag Input ---
interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ 
  label, 
  tags, 
  onChange, 
  maxTags = 5,
  placeholder = "Add Tag..."
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim().replace(/,/g, '');
    if (trimmed && tags.length < maxTags && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter(t => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">{label}</label>
      <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-wrap gap-2 focus-within:border-spot-red transition-colors min-h-[64px]">
        {tags.map(tag => (
          <span 
            key={tag} 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-spot-charcoal shadow-sm group hover:border-spot-red transition-all"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="p-0.5 hover:bg-black/5 rounded-full text-spot-charcoal/20 group-hover:text-spot-red transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        {tags.length < maxTags && (
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent focus:outline-none text-[10px] font-bold uppercase tracking-widest text-spot-charcoal border-none p-0 h-full"
          />
        )}
        {tags.length >= maxTags && (
            <span className="text-[8px] font-black uppercase text-spot-charcoal/20 self-center">Max {maxTags} Tags Built</span>
        )}
      </div>
    </div>
  );
};

// --- Section Header ---
interface SectionProps {
  num: number;
  label: string;
  className?: string;
  color?: string;
}

export const SectionHeader: React.FC<SectionProps> = ({ num, label, className = "", color = "bg-spot-red" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className={`w-8 h-8 rounded-xl ${color} text-white flex items-center justify-center font-black text-xs shadow-lg shadow-black/5 shrink-0`}>
      {num}
    </div>
    <div className="h-px bg-black/5 flex-1" />
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/40">{label}</span>
  </div>
);
