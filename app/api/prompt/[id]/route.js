import mongoose from 'mongoose'; // Import mongoose module
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new Response("Prompt not found", { Status: 404 })
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}


// PATCH (update)
export const PATCH = async (request, { params }) => {
  console.log('Handling PATCH request...');
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    // const existingPrompt = await Prompt.findById(params.id);
    const existingPrompt = await Prompt.findOne(params);
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to update prompt", { status: 500 })
  }
}

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  // try {
  //   await connectToDB();

  //   await Prompt.findOneAndRemove();
  //   console.log('Prompt deleted successfully');
  //   return new Response("Prompt deleted successfully", { status: 200 })
  // } catch (error) {
  //   return new Response("Failed to delete prompt", { status: 500 })
  // }

  try {
    await connectToDB();
    if (!mongoose.isValidObjectId(params.id)) {
      console.error('Invalid ObjectId:', params.id);
      return new Response("Invalid ObjectId", { status: 400 });
    }

    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    // const objectId = new mongoose.Types.ObjectId(params.id);
    // const deletedPrompt = await Prompt.findByIdAndDelete(objectId);

    if (!deletedPrompt) {
      console.error('Prompt not found');
      return new Response("Prompt not found", { status: 404 });
    }

    console.log('Prompt deleted successfully');
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error('Failed to delete prompt:', error);
    return new Response(`Failed to delete prompt. Error: ${error.message}`, { status: 500 });
  }

}








