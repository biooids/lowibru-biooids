import React from "react";

import {
  Button,
  Carousel,
  Drawer,
  Label,
  Textarea,
  TextInput,
  Radio,
  Card,
  Avatar,
} from "flowbite-react";
import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

import "./home.css";
import profilePic from "../../../assets/father.jpg";

import { Link } from "react-router-dom";
import LeadersComp from "./components/LeadersComp";
import CommentsComp from "./components/CommentsComp";
import CountryComp from "./components/CountryComp";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <section>
      <section className=" border-b-2 border-slate-60 p-3 sm:hidden ">
        <Avatar img={profilePic} bordered rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </Avatar>
        <div className=" gap-3 justify-between flex items-center ">
          <Link to="signin">
            <div className="">
              <p className="mb-4">Have an account ?</p>
              <Button>Sign in</Button>
            </div>
          </Link>

          <Link to="signup">
            <div>
              <p className="mb-4">don't have an account ?</p>
              <Button>Create account</Button>
            </div>
          </Link>
        </div>
      </section>
      <section className=" landing-section">
        <div>
          <h1 className="text-4xl mb-4">Welcome to FFWPU</h1>
          <ul className="text-sm text-gray-400 ">
            <li>F : family</li>
            <li>F : fedearation for </li>
            <li>W : world</li>
            <li>P : peace and</li>
            <li>U : unificatiion</li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl mb-4">OUR MAIN MISSION</h2>
          <p className="text-sm text-gray-400">
            Conduct educational and training programs to indivduals with mind
            unity by living for the sake of others and creating a culture of
            service Propagate and promote the vision and phylosophy of peace of
            FFWUP, founders, Dr. SUN MYUNG MOON and Dr. HAK JA HAN MOON
          </p>
        </div>
        <div>
          <div className="flex justify-between h-full  flex-col">
            <div>
              <ul className="text-3xl ">
                <li>Rwanda : 10k+</li>
                <li>World : 100M+</li>
              </ul>
            </div>

            <Button onClick={() => setIsOpen(true)} className="w-full mt-8">
              Join Us
            </Button>
          </div>

          <div>
            <Drawer open={isOpen} onClose={handleClose}>
              <Drawer.Header title="JOIN US" titleIcon={HiEnvelope} />
              <Drawer.Items>
                <form>
                  <div className="mb-4 mt-3">
                    <Label htmlFor="email" className="mb-4 block">
                      Your email (optional)
                    </Label>
                    <TextInput
                      icon={HiMail}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="subject" className="mb-4 block">
                      Number
                    </Label>
                    <TextInput
                      icon={FaPhoneAlt}
                      type="number"
                      id="subject"
                      name="number"
                      placeholder="Whatsapp can be better"
                      required
                    />
                  </div>
                  <div className="max-w-md mb-4">
                    <div className="mb-4 block">
                      <Label htmlFor="region" value=" Your Region " />
                    </div>

                    <CountryComp />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="message" className="mb-4 block">
                      Leave a message (optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message..."
                      rows={4}
                    />
                  </div>

                  <fieldset className="flex gap-3 mb-4">
                    <legend className="mb-4">Your gender</legend>
                    <div className="flex items-center gap-3 ">
                      <Radio
                        id="male"
                        name="gender"
                        value="male"
                        defaultChecked
                      />
                      <Label htmlFor="male">male</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Radio id="female" name="gender" value="female" />
                      <Label htmlFor="female">female</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Radio id="other" name="gender" value="other" />
                      <Label htmlFor="spain">other</Label>
                    </div>
                  </fieldset>
                  <div className="mb-4">
                    <Button type="submit" className="w-full">
                      Submit the Form
                    </Button>
                  </div>
                </form>

                <div className="flex flex-col">
                  <div>
                    <p> Have filling form question? </p>
                    <p>Reach Us:</p>
                  </div>
                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                    <a
                      href="mailto:ehwapyongm@gmail.com"
                      className="hover:underline"
                    >
                      Email: ehwapyongm@gmail.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <a href="tel:2124567890" className="hover:underline">
                      Phone: +250 790 931 024 (Whatsapp)
                    </a>
                  </p>
                </div>
              </Drawer.Items>
            </Drawer>
          </div>
        </div>
      </section>
      <article className="h-56 sm:h-64 xl:h-80 2xl:h-96 bg-black w-full">
        <Carousel slideInterval={1000}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </article>

      <section className="bg-slate-800  p-3 sm:m-10 ml-2 mr-2 mt-10">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 text-center ">
          About Us
        </h5>

        <div className="explanation-cards  ">
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-4">
                What Motivates Us?
              </h5>
              <ul className="list-disc flex flex-col gap-3 text-gray-400">
                <li>
                  Living for the sake of others. A life that has value, is a
                  life where we abandon our private desires for the public good.
                </li>
                <li>
                  We believe in a world filled with love,peace and harmony.A
                  united world lack of crimes, huger and other global challenges
                </li>
                <li>
                  God created the world by the power of love, this love must be
                  known by all humanity, So we are motivated to teach this
                  principle
                </li>
              </ul>
            </div>
          </Card>
          <Card className="w-full ">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-4">
                What do we do?
              </h5>
              <ul className="list-disc  flex flex-col gap-3 text-gray-400">
                <li>
                  We mainly teach divine principle a phylosophy of peace of
                  FFWUP, and the way humanity should live together achieve peace
                  and harmony. Divine principle can help bring the world that
                  God wanted. A united world lack of sorrow a world like
                  paradise
                </li>
                <li>
                  We train youths and young We train youths and young to grow
                  like sons and doughters of God, mainting their purity till
                  maturity
                </li>
                <li>We promote peace all over every Nation</li>
              </ul>
            </div>
          </Card>
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-4">
                What do we believe in?
              </h5>
              <ul className="list-disc  flex flex-col gap-3 text-gray-400">
                <li>
                  WE bilieve in one and only one God, the creator of heaven and
                  earth, the God that cristians,Islam,Judaism,... belive in
                </li>
                <li>We worship and praise one God</li>
                <li>
                  We believe in a boundless love regardless skin color, nation,
                  race ... , to mean equal love. We don't believe in a
                  purposefull love
                </li>
              </ul>
            </div>
          </Card>
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-4">
                Cult or a new religion?
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                The internet is filled with many informations both wrong and
                true ones We are not cult or new religion or moonies based in
                Korea as many internet informations says If you take your time
                and sit with one of our members, you will understand exactly who
                we are. Offcoursse some people call them selves ex moonies but,
                if you are curious about us, there are trusted sources you can
                reach and have real unbiased information. there are centers in
                every country that you can reach and we will welcome you as you
                are.
              </p>
              <Button className="mt-3">Ask Us Questions</Button>
              <div className="mt-3 flex flex-col gap-3">
                <h6 className="text-lg underline">
                  Go to the real Source below
                </h6>
                <ul className="flex flex-col gap-3 lg:flex-row justify-between text-gray-400 ">
                  <li className="hover:underline">
                    <a href="">Piece Tv</a>
                  </li>
                  <li className="hover:underline">
                    <a href="">UPF Main Site</a>
                  </li>
                  <li className="hover:underline">
                    <a href="">FFWPU World</a>
                  </li>
                  <li className="hover:underline">
                    <a href="">Youtube</a>
                  </li>
                  <li className="hover:underline">
                    <a href="">facebook</a>
                  </li>
                  <li className="hover:underline">
                    <a href="">Instagram</a>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
      <section className="bg-slate-800 sm:m-10 p-3 ml-2 mr-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 text-center mb-4">
          OUR VISSION
        </h5>
        <p className="text-center text-lg text-gray-400">
          Creating God Centered Ideal famillies Of True Love as Cornerstine for
          World Peace.
        </p>
      </section>
      <section className="bg-slate-800 sm:m-10 p-3 mt-10 ">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 text-center ">
          OUR MISSIONS
        </h5>
        <div className="mission-cards  ">
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                1.
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Propagate and promote the vision and phylosophy of peace of
                FFWUP, founders, Dr. SUN MYUNG MOON and Dr. HAK JA HAN MOON.
              </p>
            </div>
          </Card>
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                2.
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Let all humanity realize that we are one human family created by
                the heavenly parent, our creator.
              </p>
            </div>
          </Card>
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                3.
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                inspire and empower individuals establish ideal marriage become
                ideal husband and wives and build ideal families of true love.
              </p>
            </div>
          </Card>
          <Card className="w-full">
            <div className="h-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                4.
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Conduct educational and training programs to indivduals with
                mind unity by living for the sake of others and creating a
                culture of service.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="leaders-section sm:m-10 mt-10 mr-2 ml-2 ">
        <h2 className="text-2xl">
          Leaders in Location: <span>Rwanda</span>
        </h2>
        <div className="leader-card-containers">
          <LeadersComp
            title="National leader"
            leaderName="Wilonja Mukamba"
            description=" Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          />
          <LeadersComp
            title="National leader"
            leaderName="Wilonja Mukamba"
            description=" Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          />
          <LeadersComp
            title="National leader"
            leaderName="Wilonja Mukamba"
            description=" Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          />
          <LeadersComp
            title="National leader"
            leaderName="Wilonja Mukamba"
            description=" Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          />
          <LeadersComp
            title="National leader"
            leaderName="Wilonja Mukamba"
            description=" Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          />
          <LeadersComp
            title="National leader"
            leaderName="Wilonja Mukamba"
            description=" Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order."
          />
        </div>
      </section>

      <section className="sm:m-10 mt-10 ml-2 mr-2 flex flex-col lg:grid lg:grid-cols-2  bg-slate-800 p-6 gap-3">
        <div className="">
          <h3 className="text-xl mb-4">
            General blog for Questions and answers
          </h3>
          <p className="text-sm max-w-md text-gray-400">
            We encourage you to actively participate by posting and asking
            thoughtful inquiries. Let's keep the conversation enriching and
            respectful by refraining from posting rude or unrelated questions.
            Thank you for being a part of it
          </p>
          <form className="mt-3 flex gap-3 flex-col">
            <div className="max-w-md">
              <div className="mb-4 block">
                <Label htmlFor="comment" value="Add Comment" />
              </div>
              <Textarea
                id="comment"
                name="comment"
                type="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
            <Button type="submit" className="w-fit">
              Add Comment
            </Button>
          </form>
          <section className="flex gap-3 flex-col mt-3  pt-2">
            <h5>comments:</h5>
            <CommentsComp />
            <CommentsComp />
            <CommentsComp />
            <CommentsComp />
          </section>
        </div>
        <div className="  h-fit sticky top-0">
          <h3 className="text-xl mb-xl mb-4"> Hello World !</h3>
          <div className="flex gap-3 flex-col">
            <p className="text-sm text-gray-400">
              Your support fuels our efforts to continue sharing these vital
              teachings with the world. Together, let's inspire positive change
              and build a brighter future based on love, compassion, and unity.
              Thank you for considering supporting our noble cause.
            </p>
            <Button>Support Our Work</Button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default HomePage;
