//Sidebar.tsx
import styled from 'styled-components'
import Image from 'next/image'
import colors from '@/lib/constants/colors'
import device from '@/lib/constants/breakpoints'

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarCap>
        <Image
         src="/appSvgs/Combined Shape.svg"
         alt="Logo"
         width={40}
         height={40}
         style={{filter: 'brightness(0) invert(1)'}}
        />

      </SidebarCap>
      

      <SidebarFooter>
     
       <NavItemContainer isAvatar={false}>
        <NavItem>
          <Image
           src="/appSvgs/Path.svg"
           alt="Logo"
           width={24}
           height={24}
           style={{filter: 'brightness(0.5) sepia(1) hue-rotate(210deg) saturate(2)'}}
          />
        </NavItem>
        </NavItemContainer>
       <NavItemContainer isAvatar>
       <NavItem isAvatar>
        <Image
         src="/paul.jpeg"
         alt="Logo"
         width={40}
         height={40}
        />
        </NavItem>
        </NavItemContainer>
      </SidebarFooter> 
    </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.aside`
  width: 103px;
  background: #373b53;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding:0;
  gap: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 120;
  @media (${device.tablet}) {
    width: 100%;
    flex-direction: row;
    height: 80px;
    border-top-right-radius: 0;
    gap: 16px;
  }
`

const SidebarCap = styled.div`
  width: 100%;
  height: 103px;
  background: ${colors.mainPurple};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (${device.tablet}) {
    height: 100%;
    width: 80px;
    padding: 0;
  }
`


const NavItemContainer = styled.div<{ isAvatar?: boolean }>`
  width: 100%;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${(props) => (props.isAvatar ? '1px solid rgba(255, 255, 255, 0.1)' : 'none')};
  
  @media (${device.tablet}) {
    width: auto;
    padding: 0;
    border-top: none;
  }
`

const NavItem = styled.button<{ isActive?: boolean; isAvatar?: boolean }>`
  width: ${(props) => (props.isAvatar ? '44px' : '48px')};
  height: ${(props) => (props.isAvatar ? '44px' : '48px')};
  margin: 0 auto;
  border: none;
  background: ${(props) => (props.isActive ? '#7c3aed' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  cursor: pointer;
  border-radius: ${(props) => (props.isAvatar ? '50%' : '12px')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  svg {
    width: 24px;
    height: 24px;
  }

  img {
    ${(props) => props.isAvatar && `
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    `}
  }

  &:hover {
    background-color: ${(props) => (props.isActive ? '#7c3aed' : 'rgba(255, 255, 255, 0.1)')};
    color: white;
  }

  ${(props) =>
    props.isAvatar &&
    `
    background-color: rgba(255, 255, 255, 0.2);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  `}
`

const SidebarFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 9px;
  margin-top: auto;
  
  @media (${device.tablet}) {
    flex-direction: row;
    margin-top: 0;
    margin-left: auto;
    margin-right: 32px;
    width: auto;
    gap: 16px;
  }
`