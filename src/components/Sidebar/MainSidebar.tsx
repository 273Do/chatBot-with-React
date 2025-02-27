import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import * as SB from "./index";

import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import useRoomCollection from "@/hooks/useRoomCollection";

// ログイン後のサイドバー全体のコンポーネント
const MainSidebar = () => {
  const {
    // state,
    open,
    // setOpen,
    // openMobile,
    // setOpenMobile,
    // isMobile,
    // toggleSidebar,
  } = useSidebar();

  const roomMode = useAppSelector((state: RootState) => state.roomMode.mode);

  // ユーザのルーム情報を取得
  const { roomDocuments: rooms } = useRoomCollection();
  // console.log(rooms);

  return (
    <>
      <SB.Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {rooms && (
              <SidebarMenu>
                {roomMode === 2 ? (
                  <SB.ModeDiary isOpen={open} rooms={rooms} />
                ) : (
                  <SB.ModeDefault isOpen={open} rooms={rooms} />
                )}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SB.Footer />
    </>
  );
};

export default MainSidebar;
