import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutProvider } from "src/base/contex/LayoutContext";
import { IChildPage, IPage, IRoutes } from "src/routes/interface";

// routes
import routes from "src/routes";
import { Suspense } from "react";

function App() {
  return (
    <LayoutProvider>
      <Router>
        <Suspense>
          <Routes>
            {routes.map((route: IRoutes, idx_route: number) =>
              !!route.layout
                ? route.pages.length > 0 && (
                    <Route key={`l-${idx_route}`} element={route.layout}>
                      {route.pages.map((page: IPage, idx_page: number) =>
                        !page.child ? (
                          <Route
                            key={`p-${idx_page}`}
                            path={page.path}
                            element={page.element}
                          />
                        ) : (
                          <Route key={`p-${idx_page}`} path={page.path}>
                            <Route index element={page.element} />
                            {page.child.map(
                              (child_page: IChildPage, idx_child: number) => (
                                <Route
                                  key={`c-${idx_child}`}
                                  path={child_page.path}
                                  element={child_page.element}
                                />
                              )
                            )}
                          </Route>
                        )
                      )}
                    </Route>
                  )
                : route.pages.length > 0 &&
                  route.pages.map((page: IPage, idx_page: number) =>
                    !page.child ? (
                      <Route
                        key={`p-${idx_page}`}
                        path={page.path}
                        element={page.element}
                      />
                    ) : (
                      <Route key={`p-${idx_page}`} path={page.path}>
                        <Route index element={page.element} />
                        {page.child.map(
                          (child_page: IChildPage, idx_child: number) => (
                            <Route
                              key={`c-${idx_child}`}
                              path={child_page.path}
                              element={child_page.element}
                            />
                          )
                        )}
                      </Route>
                    )
                  )
            )}
          </Routes>
        </Suspense>
      </Router>
    </LayoutProvider>
  );
}

export default App;
