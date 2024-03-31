import { Button, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../../store/useLoginStore";
import { MouseEvent, useState } from "react";
import useTabStore from "../../store/useTabStore";
import { Face, Logout, Person, Settings } from "@mui/icons-material";

export default function ProfileMenu(props: { image: string }) {
  const { setTabIndex } = useTabStore();
  const { loginMemberId, logout } = useLoginStore();
  const navigate = useNavigate();

  // 메뉴와 연결될 element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 메뉴 버튼 click, mouseEnter 이벤트 핸들러
  // 메뉴와 연결한다.
  function handleOpen(e: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  let timeoutId: NodeJS.Timeout | null = null;

  // 메뉴 버튼 mouseLeave 이벤트 핸들러
  // 메뉴와 연결을 해제한다.
  const handleClose = () => {
    if (!!timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setAnchorEl(null);
    }, 0);
  };

  // 메뉴 close, mouseLeave 이벤트 핸들러
  // 메뉴를 닫는다.
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 메뉴 mouseEnter 이벤트 핸들러
  // 메뉴를 연다.
  const handleMenuEnter = () => {
    if (!!timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // 메뉴 아이템 click 이벤트 핸들러
  // 메뉴를 닫고 to로 주소를 이동한다.
  const handleClickMenuItem = (to: string) => {
    setAnchorEl(null);
    navigate(to);
  };

  // 로그아웃 메뉴 아이템 click 이벤트 핸들러
  // 메뉴를 닫고 로그아웃을 한다.
  function handleLogout() {
    setAnchorEl(null);
    logout();
    navigate("/");
  }

  return (
    <>
      <Button
        sx={{ zIndex: (theme: any) => theme.zIndex.modal + 1 }}
        onClick={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        style={{ backgroundColor: "transparent" }}
      >
        <Link to={`/mypage/${loginMemberId}/profile`}>
          <img
            src={props.image}
            alt="profile"
            className="w-12 h-12 rounded-full"
            onClick={() => setTabIndex(0)}
          />
        </Link>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
          onMouseEnter: handleMenuEnter,
        }}
      >
        <MenuItem
          onClick={() =>
            handleClickMenuItem(`/mypage/${loginMemberId}/profile`)
          }
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          내 프로필
        </MenuItem>
        <MenuItem
          onClick={() => handleClickMenuItem(`/mypage/${loginMemberId}/vip`)}
        >
          <ListItemIcon>
            <Face fontSize="small" />
          </ListItemIcon>
          VIP 관리
        </MenuItem>
        <MenuItem onClick={() => handleClickMenuItem(`/settings`)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          설정
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
}
