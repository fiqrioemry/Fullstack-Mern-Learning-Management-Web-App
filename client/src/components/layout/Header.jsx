import { Button } from "../ui/button";
import { SiSololearn } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { TvMinimalPlay } from "lucide-react";
function Header() {
  const navigate = useNavigate();

  return (
    <header className="py-4 border-b ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center gap-x-4 hover:text-black">
            <SiSololearn className="h-9 w-9" />
            <span className="font-extrabold md:text-xl text-[14px] tracking-[2px]">
              LearnSphere
            </span>
          </Link>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => {
                location.pathname.includes("/courses")
                  ? null
                  : navigate("/courses");
              }}
              className="text-[14px] md:text-[16px] font-medium"
            >
              Explore Courses
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex gap-4 items-center">
            <div
              onClick={() => navigate("/student-courses")}
              className="flex cursor-pointer items-center gap-3"
            >
              <span className="font-extrabold md:text-xl text-[14px]">
                My Courses
              </span>
              <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
            </div>
            <Button>Sign Out</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
