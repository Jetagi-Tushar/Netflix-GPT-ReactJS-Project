import OpenAI from "openai";
import { OPENAI_API_KEY } from "../utils/constant";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});
export default client;
