import * as reactRouterDom from "react-router-dom";
import { vi } from "vitest";

const mockNavigate = vi.fn();

// Create a vi mock of the react-router-dom module
export default {
  ...reactRouterDom,
  useNavigate: vi.fn(() => mockNavigate),
  useParams: vi.fn(() => ({})),
  useLocation: vi.fn(() => ({ pathname: "/" })),
  MemoryRouter: reactRouterDom.MemoryRouter,
  Routes: reactRouterDom.Routes,
  Route: reactRouterDom.Route,
};
