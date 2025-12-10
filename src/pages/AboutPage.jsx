import React from 'react';

const imgRectangle13 = "https://www.figma.com/api/mcp/asset/8a3f14b4-241e-48e4-a87f-f1274455de27";
const imgRectangle14 = "https://www.figma.com/api/mcp/asset/d9865b61-dc9f-455c-a013-71233d4e0b97";
const imgRectangle15 = "https://www.figma.com/api/mcp/asset/6ebb63b0-17e1-4e15-b39e-9e712a4ed676";
const imgRectangle16 = "https://www.figma.com/api/mcp/asset/9d5837c5-aa2b-4358-90ac-fc3e50a16cad";
const imgRectangle17 = "https://www.figma.com/api/mcp/asset/de42d82b-66b5-4a88-8eab-cacbc4645338";
const imgRectangle1 = "https://www.figma.com/api/mcp/asset/8bd02086-bb59-43a2-b027-760b33e0abb8";

const team = [
  { name: 'Roshini Rangarajan', title: 'CEO & Founding Engineer', img: imgRectangle13 },
  { name: 'Fatima Bashir', title: 'CTO & Founding Engineer', img: imgRectangle14 },
  { name: 'Anisha Nawar', title: 'COO & Founding Engineer', img: imgRectangle15 },
  { name: 'Nidhi Jagadeesh', title: 'CFO & Founding Engineer', img: imgRectangle16 },
  { name: 'Ashna Pradhan', title: 'CPO & Founding Engineer', img: imgRectangle17 },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b55cf5] via-[#9b76ff] to-[#6fa7ff] text-white pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-28">
        {/* Header nav is rendered by App; keep top spacing clear */}

        <section className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">Our Story</h1>
          <p className="text-lg md:text-xl leading-8">
            WillowWheel was created to fix one simple problem: insurance shouldn’t feel confusing, overwhelming, or unfair.
            As new drivers and young adults, we saw how difficult it was to understand coverage, compare options, and trust
            that decisions were actually in our best interest. So we built WillowWheel to put clarity first — translating
            insurance into plain language, reducing stress, and giving people confidence before they ever speak to an agent.
            Our goal is simple: help you make smarter insurance decisions, without pressure.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Meet the team</h2>
          <p className="text-base md:text-lg text-white/80 mb-10">Meet the team behind WillowWheel!</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center space-y-3">
                <div className="w-48 h-48 rounded-md overflow-hidden shadow-md">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-lg font-semibold leading-tight text-white">{member.name}</p>
                  <p className="text-sm text-white/90 leading-snug">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-16 bg-gradient-to-r from-[#b55cf5] via-[#9b76ff] to-[#6fa7ff] py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-white space-y-2">
          <div className="font-brand text-[48px] leading-none">ww</div>
          <p className="text-lg">
            2025 Made with <span role="img" aria-label="heart">❤️</span> by Team Car Insurance
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


