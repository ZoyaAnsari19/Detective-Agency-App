import React, { useState, useEffect, useRef, useMemo, Children, cloneElement, forwardRef, isValidElement } from "react";
import gsap from "gsap";
import "./styles/description.css";

/* ---------- CardSwap Component ---------- */
export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  >
    {rest.children} {/* Ensure children (like img) are rendered */}
  </div>
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 250,
  height = 180,
  cardDistance = 50,
  verticalDistance = 60,
  delay = 4000,
  pauseOnHover = true,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=400",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      });
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );
      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

/* ---------- Description Section ---------- */
const Description = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullText = "About Nakshatra Detectives";

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setDisplayText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="description" id='description'>
      <div className="container">
        <h2 className="section-title">
          {displayText}
          {isTyping && <span className="cursor">|</span>}
        </h2>

        <div className="description-content">
          <p>
            At Nakshatra Detectives, we specialize in providing comprehensive
            investigation services tailored to meet the unique needs of each client.
          </p>
          <p>
            Our team of experienced professionals uses advanced techniques and
            cutting-edge technology to uncover the truth while maintaining confidentiality.
          </p>
          <button className="btn" onClick={openModal}>
            Read More
          </button>
        </div>
      </div>

      {/* 🔹 CardSwap Animation with images */}
      <CardSwap>
        <Card style={{ background: "linear-gradient(135deg, #003366, #0066cc)" }}>
          <img src="/img/img5.png" alt="Detective Image 1" />
        </Card>
        <Card style={{ background: "linear-gradient(135deg, #004080, #0099ff)" }}>
          <img src="/img/img6.png" alt="Detective Image 2" />
        </Card>
        <Card style={{ background: "linear-gradient(135deg, #002244, #00bfff)" }}>
          <img src="/img/img7.png" alt="Detective Image 3" />
        </Card>
      </CardSwap>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Our Approach</h3>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Our methodology combines traditional investigative techniques with
                modern tools for accurate results.
              </p>
              <p>
                We maintain constant communication and confidentiality throughout the
                process, ensuring transparency and trust.
              </p>
              <p>
                Nakshatra Detectives has earned recognition for integrity,
                professionalism, and results-driven excellence.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Description;