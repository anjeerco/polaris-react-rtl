import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
import {
  ActionMenu,
  Breadcrumbs,
  Pagination,
  Badge,
  Avatar,
  Button,
  ButtonGroup,
} from 'components';
import {mountWithApp} from 'tests/utilities';

import type {LinkAction} from '../../../../../types';
import {Header, HeaderProps} from '../Header';

describe('<Header />', () => {
  const mockProps: HeaderProps = {
    title: 'mock title',
  };

  describe('Header', () => {
    const mockProps = {
      title: 'title',
      subtitle: 'subtitle',
      titleMetadata: <Badge>Sold</Badge>,
      thumbnail: <Avatar customer />,
    };

    it('sets the title on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        title: mockProps.title,
      });
    });

    it('sets the subtitle on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        subtitle: mockProps.subtitle,
      });
    });

    it('sets the thumbnail on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        thumbnail: mockProps.thumbnail,
      });
    });

    it('sets the titleMetadata on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        titleMetadata: mockProps.titleMetadata,
      });
    });
  });

  describe('breadcrumbs', () => {
    const breadcrumbs: LinkAction[] = [
      {
        content: 'Products',
        url: 'https://www.google.com',
      },
    ];

    it('get passed into Breadcrumbs', () => {
      const header = mountWithApp(
        <Header {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(header).toContainReactComponent(Breadcrumbs, {
        breadcrumbs,
      });
    });
  });

  describe('primaryAction', () => {
    const buttonContent = 'Click me!';

    it('renders a `primary` button based on the given action', () => {
      const primaryAction: HeaderProps['primaryAction'] = {
        content: buttonContent,
      };

      const header = mountWithApp(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      expect(header).toContainReactComponent(Button, {
        primary: true,
        children: buttonContent,
      });
    });

    it('renders a regular button based on the given action when primary is set to false', () => {
      const primaryAction: HeaderProps['primaryAction'] = {
        content: buttonContent,
        primary: false,
      };

      const header = mountWithApp(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      expect(header).toContainReactComponent(Button, {
        primary: false,
        children: buttonContent,
      });
    });

    it('renders a `ReactNode`', () => {
      const PrimaryAction = () => null;

      const header = mountWithApp(
        <Header {...mockProps} primaryAction={<PrimaryAction />} />,
      );

      expect(header).toContainReactComponent(PrimaryAction);
    });
  });

  describe('pagination', () => {
    it('gets passed into Pagination', () => {
      const pagination = {
        hasNext: true,
      };

      const header = mountWithApp(
        <Header {...mockProps} pagination={pagination} />,
      );

      expect(header).toContainReactComponent(Pagination, {
        hasNext: true,
      });
    });
  });

  describe('actionGroups', () => {
    const mockSecondaryActions: HeaderProps['secondaryActions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];
    const mockActionGroups: HeaderProps['actionGroups'] = [
      {
        title: 'First group',
        actions: mockSecondaryActions,
      },
      {
        title: 'Second group',
        actions: mockSecondaryActions,
      },
    ];

    it('passes to <ActionMenu />', () => {
      const wrapper = mountWithApp(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        groups: mockActionGroups,
      });
    });
  });

  describe('additionalNavigation', () => {
    it('renders element if passed', () => {
      const TestComponent = () => <div />;

      const header = mountWithApp(
        <Header {...mockProps} additionalNavigation={<TestComponent />} />,
      );

      expect(header).toContainReactComponent(TestComponent);
    });
  });

  describe('<ActionMenu />', () => {
    const mockSecondaryActions: HeaderProps['secondaryActions'] = [
      {content: 'mock content 1'},
    ];

    it('does not render without either `secondaryActions` or `actionGroups`', () => {
      const wrapper = mountWithApp(<Header {...mockProps} />);

      expect(wrapper).not.toContainReactComponent(ActionMenu);
    });

    it('does not render if `actionGroups` has no `actions', () => {
      const mockActionGroups: HeaderProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [],
        },
      ];
      const wrapper = mountWithApp(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper).not.toContainReactComponent(ActionMenu);
    });

    it('renders with at least valid `secondaryActions`', () => {
      const mockSecondaryActions: HeaderProps['secondaryActions'] = [
        {content: 'mock content'},
      ];
      const wrapper = mountWithApp(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu);
    });

    it('renders with at least valid `actionGroups`', () => {
      const mockActionGroups: HeaderProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [{content: 'mock content 1'}],
        },
      ];
      const wrapper = mountWithApp(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu);
    });

    it('renders with `rollup` as `false` when on desktop', () => {
      const wrapper = mountWithApp(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        rollup: false,
      });
    });

    it('renders with `rollup` as `true` when on mobile', () => {
      const wrapper = mountWithApp(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
        {mediaQuery: {isNavigationCollapsed: true}},
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        rollup: true,
      });
    });
  });

  const primaryAction: HeaderProps['primaryAction'] = {
    content: 'Click me!',
    icon: PlusMinor,
  };

  const secondaryActions: HeaderProps['secondaryActions'] = [
    {content: 'mock content 1'},
    {content: 'mock content 2'},
  ];

  const breadcrumbs: LinkAction[] = [
    {
      content: 'Products',
      url: 'https://www.google.com',
    },
  ];

  it('does not render primary and secondary action wrapper divs', () => {
    const header = mountWithApp(
      <Header
        title="Hello, world!"
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      />,
    );
    expect(
      header.findAll('div', {className: 'PrimaryActionWrapper'}),
    ).toHaveLength(1);
    expect(
      header.findAll('div', {className: 'ActionMenuWrapper'}),
    ).toHaveLength(0);
  });

  it('renders a compact mobile layout with icon-only primary action', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmm" primaryAction={primaryAction} />,
      {
        mediaQuery: {isNavigationCollapsed: true},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
    expect(header).toContainReactComponent(Button, {
      icon: PlusMinor,
      children: undefined,
    });
  });

  it('renders a compact desktop layout and hides primary action icon', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmm" primaryAction={primaryAction} />,
      {
        mediaQuery: {isNavigationCollapsed: false},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
    expect(header).toContainReactComponent(Button, {
      icon: undefined,
      children: 'Click me!',
    });
  });

  it('renders a default mobile layout', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmmm" breadcrumbs={breadcrumbs} />,
      {
        mediaQuery: {isNavigationCollapsed: true},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
  });

  it('renders a default desktop layout', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmmmmmmmmmmmmmmm" primaryAction={primaryAction} />,
      {
        mediaQuery: {isNavigationCollapsed: false},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
  });

  it('wraps the secondary activator and primary buttons in a ButtonGroup', () => {
    const header = mountWithApp(
      <Header
        title="Hello, world!"
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      />,
      {
        mediaQuery: {isNavigationCollapsed: true},
      },
    );
    expect(header.findAll(ButtonGroup)).toHaveLength(0);
  });
});
