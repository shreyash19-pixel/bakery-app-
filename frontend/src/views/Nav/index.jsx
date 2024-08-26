import React, { useContext, useEffect, useState } from "react";
import {
  Navlink,
  NavLogo,
  NavWrapper,
  BakeryLogo,
  ProfileIcon,
  ProfileIconWrap,
  ResponsiveNav,
  Navlinks,
  CartBadge,
  Cart,
} from "../../styles/Nav";

import {
  faCartShopping,
  faBurger,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../../ContextApi/AppContext";
const Nav = ({ logo, navLinks }) => {
  const baseURL = "http://localhost:1337";
  const [nav, setNav] = useState(false);
  const [isactive, setIsactive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const { state, dispatch } = useContext(AppContext);

  console.log("length of cart" + state.cart.length);

  nav
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "auto");

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("top-products");
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCart = () => {
    const prodCart = document.querySelector(".show-cart");
    prodCart.classList.add("openCart");
  };

  const activenav = (index) => {
    setIsactive(isactive === index ? null : index);
  };

  return (
    <NavWrapper scrolled={scrolled}>
      <NavLogo>
        <BakeryLogo src={`${baseURL}${logo}`} alt="Logo" />
      </NavLogo>
      <Navlink>
        {navLinks.map((link, index) => (
          <Navlinks
            onClick={() => activenav(index)}
            col={isactive === index}
            href={link.URL}
            key={link.id}
          >
            {link.Name}
          </Navlinks>
        ))}
      </Navlink>
      {nav && (
        <ResponsiveNav nav={nav}>
          {navLinks.map((link) => (
            <a href={link.URL} key={link.id}>
              {link.Name}
            </a>
          ))}
          <div onClick={() => setNav(!nav)}>
            <ProfileIcon icon={faXmark} />
          </div>
        </ResponsiveNav>
      )}

      <ProfileIconWrap>
        <Cart>
          <ProfileIcon icon={faCartShopping} onClick={handleCart} />
          <CartBadge count={state.cart.length}>{state.cart.length}</CartBadge>
        </Cart>
        <ProfileIcon icon={faBurger} onClick={() => setNav(!nav)} />
      </ProfileIconWrap>
    </NavWrapper>
  );
};

export default Nav;
