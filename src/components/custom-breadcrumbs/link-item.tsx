import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { BreadcrumbsLinkProps } from './types';

// ----------------------------------------------------------------------

type Props = {
  link: BreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  itemName?: string;
};

export default function BreadcrumbsLink({
  link,
  activeLast,
  disabled,
  itemProp,
  itemScope,
  itemType,
  itemName,
}: Props) {
  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  };

  const renderContent = (
    <>
      {link.icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {link.icon}
        </Box>
      )}

      {link.name}
    </>
  );

  if (link.href) {
    return (
      <Link href={link.href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return (
    <Box sx={styles} itemProp={itemProp} itemScope={itemScope} itemType={itemType}>
      {renderContent}
    </Box>
  );
}
