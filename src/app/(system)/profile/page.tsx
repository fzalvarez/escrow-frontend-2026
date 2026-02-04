import ProfileData from "@/components/ProfileData";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="bg-[#F7F8FA] px-4 flex flex-col gap-4 pb-[90px] pt-[20px]">
      <ProfileData />
    </div>
  );
}
