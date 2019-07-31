import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  Nav,
  NavList,
  NavItem,
  NavVariants
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';

const TopNavWithData = ({ data }) => (
  <Location>
    {({ location }) => {
      const currentPath = location.pathname;
      const navItems = data.allTopNavYaml.edges.map(({ node }) => node);

      const isActiveTest = path => {
        return currentPath.indexOf(path) > -1;
      };

      const renderTopNav = () =>
        navItems.map(item => (
          <NavItem key={item.path} itemId={item.path} isActive={isActiveTest(item.path)}>
            <Link to={item.path}>{item.title}</Link>
          </NavItem>
        ));

      const nav = (
        <Nav aria-label="Top Nav">
          <NavList variant={NavVariants.horizontal}>
            {renderTopNav()}
          </NavList>
        </Nav>
      );

      return nav;
    }}
  </Location>
);

TopNavWithData.propTypes = {
  data: PropTypes.any
};

const TopNav = () => (
  <StaticQuery
    query={graphql`
      query TopNavQuery {
        allTopNavYaml {
          edges {
            node {
              title
              path
            }
          }
        }
      }
    `}
    render={data => (
      <TopNavWithData data={data} />
    )}
  />
);

export default TopNav;