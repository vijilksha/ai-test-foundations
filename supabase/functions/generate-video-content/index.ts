import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lessonId } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch lesson data
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('visual_suggestion, trainer_script')
      .eq('id', lessonId)
      .single();

    if (lessonError || !lesson) {
      throw new Error('Lesson not found');
    }

    console.log('Generating content for lesson:', lessonId);

    // Generate image using Lovable AI
    const lovableApiKeyRaw = Deno.env.get('LOVABLE_API_KEY');
    const lovableApiKey = lovableApiKeyRaw ? lovableApiKeyRaw.trim().replace(/[\r\n\t]/g, '').replace(/[^\x20-\x7E]/g, '') : '';
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('LOVABLE_API_KEY length:', lovableApiKey.length);
    console.log('LOVABLE_API_KEY first 10 chars:', lovableApiKey.substring(0, 10));

    const imagePrompt = lesson.visual_suggestion || 'Educational content visualization';
    console.log('Generating image with prompt:', imagePrompt);

    const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: new Headers([
        ['Authorization', `Bearer ${lovableApiKey}`],
        ['Content-Type', 'application/json'],
      ]),
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: `Generate an educational image: ${imagePrompt}. Ultra high resolution, professional quality.`
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error('Image generation error:', imageResponse.status, errorText);
      throw new Error(`Failed to generate image: ${errorText}`);
    }

    const imageData = await imageResponse.json();
    const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      throw new Error('No image generated');
    }

    console.log('Image generated successfully');

    // Generate audio using ElevenLabs
    const elevenlabsKeyRaw = Deno.env.get('ELEVENLABS_API_KEY');
    const elevenlabsKey = elevenlabsKeyRaw ? elevenlabsKeyRaw.trim().replace(/[\r\n\t]/g, '').replace(/[^\x20-\x7E]/g, '') : '';
    if (!elevenlabsKey) {
      throw new Error('ELEVENLABS_API_KEY not configured');
    }

    console.log('ELEVENLABS_API_KEY length:', elevenlabsKey.length);
    console.log('ELEVENLABS_API_KEY first 10 chars:', elevenlabsKey.substring(0, 10));

    const audioText = lesson.trainer_script || 'Welcome to this lesson.';
    console.log('Generating audio for text length:', audioText.length);

    const audioResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
      method: 'POST',
      headers: new Headers([
        ['xi-api-key', elevenlabsKey],
        ['Content-Type', 'application/json'],
      ]),
      body: JSON.stringify({
        text: audioText,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      }),
    });

    if (!audioResponse.ok) {
      const errorText = await audioResponse.text();
      console.error('Audio generation error:', audioResponse.status, errorText);
      throw new Error(`Failed to generate audio: ${errorText}`);
    }

    const audioArrayBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioArrayBuffer)));
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    console.log('Audio generated successfully');

    return new Response(
      JSON.stringify({
        imageUrl,
        audioUrl,
        message: 'Video content generated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
