export default function WALinkMaker (number:string, message:string) :string {
    const formatMessage = encodeURIComponent(message);
    return `https://wa.me/${number}?text=<${formatMessage}>`;
} 