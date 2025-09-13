import React, { useState, useEffect, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { StyledSelect } from './components/StyledSelect';
import { DRESS_TYPES, DRESS_COLORS, LOCATIONS, ATMOSPHERES, PHOTO_LOOKS, BODY_TYPES, HAIR_STYLES, HAIR_COLORS, GAZE_DIRECTIONS, AI_TRENDS } from './constants';
import { ImageFile, SelectOption } from './types';
import { editImageWithPrompt, enhancePrompt } from './services/geminiService';
import { WandIcon, LoadingSpinnerIcon, DownloadIcon, SparklesIcon, ShuffleIcon, ZoomIcon } from './components/IconComponents';
import { ImageComparator } from './components/ImageComparator';
import { ImageModal } from './components/ImageModal';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  
  // Style states
  const [dressType, setDressType] = useState<string>(DRESS_TYPES[0].value);
  const [dressColor, setDressColor] = useState<string>(DRESS_COLORS[0].value);
  const [bodyType, setBodyType] = useState<string>(BODY_TYPES[0].value);
  const [hairStyle, setHairStyle] = useState<string>(HAIR_STYLES[0].value);
  const [hairColor, setHairColor] = useState<string>(HAIR_COLORS[0].value);
  const [location, setLocation] = useState<string>(LOCATIONS[0].value);
  const [gazeDirection, setGazeDirection] = useState<string>(GAZE_DIRECTIONS[0].value);
  const [atmosphere, setAtmosphere] = useState<string>(ATMOSPHERES[0].value);
  const [photoLook, setPhotoLook] = useState<string>(PHOTO_LOOKS[0].value);
  const [aiTrend, setAiTrend] = useState<string>(AI_TRENDS[0].value);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [previousEditedImage, setPreviousEditedImage] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile.file);
      setOriginalImageUrl(url);

      // Cleanup the object URL when the component unmounts or the file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setOriginalImageUrl(null);
    }
  }, [imageFile]);

  const constructPrompt = useCallback(() => {
    const fullDressDescription = `an elegant ${dressColor} ${dressType}`;
    const trendText = aiTrend !== 'no specific trend' ? ` The overall aesthetic should have ${aiTrend}.` : '';
    const prompt = `Convert, 4k HD realistic, A stunning portrait of this young Indian woman with a ${bodyType} physique. She has ${hairColor} hair styled in ${hairStyle}. She is wearing ${fullDressDescription}. She is ${gazeDirection}. Dont change facial features keep exactly 100% same person. The scene is set ${location}, illuminated by ${atmosphere} light. The overall mood and style of the photograph is ${photoLook}.${trendText}`;
    setGeneratedPrompt(prompt);
  }, [dressType, dressColor, bodyType, hairStyle, hairColor, location, gazeDirection, atmosphere, photoLook, aiTrend]);

  useEffect(() => {
    constructPrompt();
  }, [constructPrompt]);

  const handleGenerateClick = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await editImageWithPrompt(imageFile.base64, imageFile.file.type, generatedPrompt);
      // Set the current image as the 'previous' one before updating with the new result
      setPreviousEditedImage(editedImage);
      setEditedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageUpload = (file: ImageFile | null) => {
    setImageFile(file);
    setEditedImage(null);
    setPreviousEditedImage(null);
  }

  const handleSurpriseMe = useCallback(() => {
    const getRandomOption = (options: SelectOption[]) => options[Math.floor(Math.random() * options.length)].value;
    
    setDressType(getRandomOption(DRESS_TYPES));
    setDressColor(getRandomOption(DRESS_COLORS));
    setBodyType(getRandomOption(BODY_TYPES));
    setHairStyle(getRandomOption(HAIR_STYLES));
    setHairColor(getRandomOption(HAIR_COLORS));
    setLocation(getRandomOption(LOCATIONS));
    setGazeDirection(getRandomOption(GAZE_DIRECTIONS));
    setAtmosphere(getRandomOption(ATMOSPHERES));
    setPhotoLook(getRandomOption(PHOTO_LOOKS));
    setAiTrend(getRandomOption(AI_TRENDS));
  }, []);

  const handleEnhancePrompt = async () => {
    if (!generatedPrompt) return;
    setIsEnhancing(true);
    setError(null);
    try {
      const enhanced = await enhancePrompt(generatedPrompt);
      setGeneratedPrompt(enhanced);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enhance prompt.');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-gray-200 p-4 sm:p-6 lg:p-8 flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Fashion Stylist
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Transform your portraits with AI-powered creative direction.
        </p>
      </header>
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto w-full">
        {/* Controls Column */}
        <div className="bg-black/20 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">Customize Your Vision</h2>
            <button
              onClick={handleSurpriseMe}
              className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 font-semibold py-2 px-4 rounded-lg transition-colors"
              title="Randomize all options"
            >
              <ShuffleIcon className="w-5 h-5" />
              Surprise Me!
            </button>
          </div>
          <div className="space-y-5">
            <ImageUploader onImageUpload={handleImageUpload} />
            <StyledSelect label="AI Trend" value={aiTrend} onChange={setAiTrend} options={AI_TRENDS} />
            <StyledSelect label="Dress Type" value={dressType} onChange={setDressType} options={DRESS_TYPES} />
            <StyledSelect label="Dress Color" value={dressColor} onChange={setDressColor} options={DRESS_COLORS} />
            <StyledSelect label="Body Type" value={bodyType} onChange={setBodyType} options={BODY_TYPES} />
            <StyledSelect label="Hair Style" value={hairStyle} onChange={setHairStyle} options={HAIR_STYLES} />
            <StyledSelect label="Hair Color" value={hairColor} onChange={setHairColor} options={HAIR_COLORS} />
            <StyledSelect label="Location" value={location} onChange={setLocation} options={LOCATIONS} />
            <StyledSelect label="Gaze Direction" value={gazeDirection} onChange={setGazeDirection} options={GAZE_DIRECTIONS} />
            <StyledSelect label="Atmosphere" value={atmosphere} onChange={setAtmosphere} options={ATMOSPHERES} />
            <StyledSelect label="Photo Look" value={photoLook} onChange={setPhotoLook} options={PHOTO_LOOKS} />
          </div>
        </div>

        {/* Prompt & Generate Column */}
        <div className="flex flex-col bg-black/20 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-lg">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">Edit Your Prompt</h2>
            <button
              onClick={handleEnhancePrompt}
              disabled={isEnhancing || !generatedPrompt}
              className="flex items-center gap-2 bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 font-semibold py-2 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnhancing ? (
                <>
                  <LoadingSpinnerIcon className="w-4 h-4" />
                  Enhancing...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  Enhance
                </>
              )}
            </button>
          </div>
          <textarea
            className="flex-grow text-md bg-gray-900/70 p-4 rounded-lg border border-gray-700 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
            value={generatedPrompt}
            onChange={(e) => setGeneratedPrompt(e.target.value)}
            aria-label="Generated Prompt"
          />
          <button
            onClick={handleGenerateClick}
            disabled={!imageFile || isLoading}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <LoadingSpinnerIcon />
                Generating...
              </>
            ) : (
              <>
                <WandIcon />
                Generate Image
              </>
            )}
          </button>
        </div>

        {/* Results Column */}
        <div className="bg-black/20 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-lg flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-gray-100">Result</h2>
          {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
          <div className="flex-grow flex items-center justify-center">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center text-center text-gray-400 border-2 border-dashed border-gray-600 rounded-lg p-8 h-full w-full">
                <LoadingSpinnerIcon className="h-12 w-12 mb-4" />
                <p className="text-xl animate-pulse">AI is working its magic...</p>
                <p className="mt-2 text-sm">This can take a moment.</p>
              </div>
            ) : editedImage && originalImageUrl ? (
               <div className="w-full flex flex-col items-center gap-4">
                 <div className="relative w-full group">
                    <ImageComparator beforeImage={previousEditedImage || originalImageUrl} afterImage={editedImage} />
                     <button
                        onClick={() => setIsZoomModalOpen(true)}
                        className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Zoom in on result image"
                      >
                        <ZoomIcon />
                      </button>
                  </div>
                 <a href={editedImage} download="ai-stylist-result.png" className="w-full max-w-xs flex items-center justify-center gap-3 bg-green-500/80 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-600/80 transition-all duration-300">
                    <DownloadIcon />
                    Download Result
                 </a>
               </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-600 rounded-lg p-8 h-full w-full">
                <p className="text-xl">Your generated image will appear here.</p>
                <p className="mt-2">Upload an image and click "Generate" to start.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <ImageModal src={isZoomModalOpen ? editedImage : null} onClose={() => setIsZoomModalOpen(false)} />
    </div>
  );
};

export default App;
