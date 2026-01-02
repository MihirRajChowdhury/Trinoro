
export interface Action {
    type: 'set-timer';
    label: string;
    duration: number;
    ambientSound?: string;
}

export interface Recommendation {
    type: 'meditation' | 'music' | 'breathwork';
    title: string;
    description: string;
    duration: string;
    link?: string; // Optional link to resource
    action?: Action;
}

export interface ChatResponse {
    message: string;
    recommendations: Recommendation[];
}

const MOOD_KEYWORDS: Record<string, string[]> = {
    stressed: ['stress', 'anxious', 'overwhelmed', 'panic', 'busy', 'pressure', 'tense'],
    sad: ['sad', 'depressed', 'down', 'unhappy', 'cry', 'lonely', 'grief'],
    angry: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'rage'],
    tired: ['tired', 'exhausted', 'sleepy', 'fatigue', 'drained', 'burnout'],
    happy: ['happy', 'joy', 'excited', 'great', 'good', 'wonderful', 'blessed'],
    neutral: ['ok', 'fine', 'normal', 'nothing', 'bored'],
};

export const analyzeMood = (input: string): string => {
    const lowerInput = input.toLowerCase();

    for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
        if (keywords.some(keyword => lowerInput.includes(keyword))) {
            return mood;
        }
    }

    return 'neutral';
};

export const getRecommendations = (mood: string): ChatResponse => {
    switch (mood) {
        case 'stressed':
            return {
                message: "I hear you. It sounds like you're carrying a lot right now. Let's take a moment to slow down.",
                recommendations: [
                    {
                        type: 'meditation',
                        title: 'Deep Relaxation',
                        description: 'A 10-minute guided meditation to release tension.',
                        duration: '10 min',
                        link: '/meditate?type=relaxation',
                        action: { type: 'set-timer', label: 'Start 10m Timer', duration: 10 }
                    },
                    {
                        type: 'breathwork',
                        title: 'Box Breathing',
                        description: 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.',
                        duration: '5 min',
                        link: '/meditate?type=box-breathing',
                        action: { type: 'set-timer', label: 'Start 5m Timer', duration: 5 }
                    },
                    {
                        type: 'music',
                        title: 'Alpha Waves',
                        description: 'Binaural beats to calm the mind.',
                        duration: '15 min'
                    }
                ]
            };
        case 'sad':
            return {
                message: "It's okay to feel this way. Be gentle with yourself. Here are some soothing options.",
                recommendations: [
                    {
                        type: 'meditation',
                        title: 'Loving Kindness',
                        description: 'Send love to yourself and others.',
                        duration: '15 min',
                        link: '/meditate?type=loving-kindness',
                        action: { type: 'set-timer', label: 'Start 15m Timer', duration: 15 }
                    },
                    {
                        type: 'music',
                        title: 'Gentle Piano',
                        description: 'Soft melodies to comfort you.',
                        duration: '20 min'
                    }
                ]
            };
        case 'angry':
            return {
                message: "I understand. Anger is a strong energy. Let's channel it safely.",
                recommendations: [
                    {
                        type: 'breathwork',
                        title: 'Cooling Breath',
                        description: 'Sitali breath to cool down the body and mind.',
                        duration: '5 min',
                        link: '/meditate?type=cooling-breath',
                        action: { type: 'set-timer', label: 'Start 5m Timer', duration: 5 }
                    },
                    {
                        type: 'meditation',
                        title: 'Observing Emotions',
                        description: 'Watch the anger without reacting.',
                        duration: '10 min',
                        link: '/meditate?type=observing',
                        action: { type: 'set-timer', label: 'Start 10m Timer', duration: 10 }
                    }
                ]
            };
        case 'tired':
            return {
                message: "Rest is important. If you can't sleep yet, try these to recharge gently.",
                recommendations: [
                    {
                        type: 'meditation',
                        title: 'Yoga Nidra',
                        description: 'Non-sleep deep rest for recovery.',
                        duration: '20 min',
                        link: '/meditate?type=yoga-nidra',
                        action: { type: 'set-timer', label: 'Start 20m Timer', duration: 20 }
                    },
                    {
                        type: 'music',
                        title: 'Delta Waves',
                        description: 'Deep sleep frequencies.',
                        duration: '30 min'
                    }
                ]
            };
        case 'happy':
            return {
                message: "That's wonderful! Let's amplify that positive energy.",
                recommendations: [
                    {
                        type: 'meditation',
                        title: 'Gratitude Flow',
                        description: 'Focus on what you are thankful for.',
                        duration: '10 min',
                        link: '/meditate?type=gratitude',
                        action: { type: 'set-timer', label: 'Start 10m Timer', duration: 10 }
                    },
                    {
                        type: 'breathwork',
                        title: 'Energizing Breath',
                        description: 'Kapalabhati breath for vitality.',
                        duration: '5 min',
                        link: '/meditate?type=energizing',
                        action: { type: 'set-timer', label: 'Start 5m Timer', duration: 5 }
                    }
                ]
            };
        default:
            return {
                message: "I'm here to support you. How are you feeling right now? You can tell me if you're stressed, sad, or just want to relax.",
                recommendations: [
                    {
                        type: 'meditation',
                        title: 'Mindfulness Check-in',
                        description: 'A quick scan of how you are doing.',
                        duration: '5 min',
                        link: '/meditate?type=mindfulness',
                        action: { type: 'set-timer', label: 'Start 5m Timer', duration: 5 }
                    }
                ]
            };
    }
};
