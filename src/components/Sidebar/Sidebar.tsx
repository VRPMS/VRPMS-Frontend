import './Sidebar.scss';
import '../../index.scss';
import { links } from "../../data/data.tsx";
import { NavLink } from "react-router-dom";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { uploadFile } from "../../store/uploadFile.ts";
import { useStore } from "../../store/store.tsx";

function Sidebar() {
  const [error, setError] = useState<string | null>(null);
  const [dataUploaded, setDataUploaded] = useState<boolean>(false);

  const handleInputFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
    }
    const result = await uploadFile(files[0]);
    setError(result.error);
    setDataUploaded(true);
  };

  useEffect(() => {
    if (!error && dataUploaded) {
      window.location.reload();
      setDataUploaded(false);
    }
  }, [error, dataUploaded]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return <div className="sidebar">
    <div className="sidebar__logo-container">
      <p className="sidebar__logo-container__logo">Logistics</p>
      <p className="sidebar__logo-container__subtitle">Admin dashboard</p>
    </div>
    <div className="sidebar__menu">
      <nav className="sidebar__nav">
        {links.map(link => (
          <NavLink
            to={link.path}
            key={link.id}
            className={({ isActive }) => (
              isActive
                ? "sidebar__nav__item sidebar__nav__item--selected"
                : "sidebar__nav__item")}
          >
            <svg className="sidebar__nav__item__icon" width="18" height="18">
              <use href={link.icon}/>
            </svg>
            <p className="sidebar__nav__item__title">{link.title}</p>
          </NavLink>
        ))}
      </nav>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadOutlinedIcon/> as ReactNode}
        sx={{
          padding: '16px 20px',
          borderRadius: '12px',
          border: '2px solid #262626',
          backgroundColor: 'transparent',
          color: '#262626',
          fontSize: 16,
          fontFamily: 'SF Pro Display, sans-serif',
          textTransform: 'none',
          boxShadow: 'none',
          lineHeight: 1.5,
          gap: '12px',
          '& span svg': {
            width: 20,
            height: 20
          },
          '&:hover': {
            backgroundColor: '#26262620',
            boxShadow: 'none',
          },
        }}
      >
        Upload file with data
        <VisuallyHiddenInput
          type="file"
          onChange={async (event) => await handleInputFileChange(event)}
          multiple={false}
        />
      </Button>
      {error && <p className="sidebar__nav__button--error">{error}</p>}
    </div>
  </div>
}

export default Sidebar;
