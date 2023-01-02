import twilio from 'twilio';

const sid = "ACe631c0196fe0a01e38ed1f5968cbbd47";
const token = "754468614b0fb29c03de70a089628056";

export const client = twilio(sid, token)