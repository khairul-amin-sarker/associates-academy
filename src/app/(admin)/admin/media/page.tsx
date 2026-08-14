import { MediaUploader } from "@/components/admin/media-uploader";
import { Badge } from "@/components/ui/badge";

export default function MediaPage() { return <div><Badge variant="outline">VERIFIED STORAGE</Badge><h1 className="font-heading mt-3 text-4xl font-extrabold">Media Library</h1><p className="mt-2 text-muted-foreground">Signed direct upload, MIME/size validation এবং object verification-এর পরেই CMS reference তৈরি হয়।</p><div className="mt-6"><MediaUploader /></div></div>; }
