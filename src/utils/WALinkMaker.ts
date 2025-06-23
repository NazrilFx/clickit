export default function WALinkMaker (phone:string, message:string) :string {
    const formatMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${formatMessage}`;
} 