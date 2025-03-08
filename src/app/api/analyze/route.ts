import { NextResponse } from 'next/server';
import { analyzeDependencies } from '@/lib/analyzer';

export async function POST(request: Request) {
  try {
    const { projectPath, ecosystem } = await request.json();

    if (!projectPath) {
      return NextResponse.json(
        { error: 'Project path is required' },
        { status: 400 }
      );
    }

    // In a real application, you would want to validate the projectPath
    // to ensure it's safe and accessible
    
    const result = await analyzeDependencies(projectPath, ecosystem || 'auto');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 