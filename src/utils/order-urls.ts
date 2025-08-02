// Order URL utilities for tab navigation

export const ORDER_TAB_OPTIONS = ['details', 'history', 'messages'] as const;
export type OrderTabValue = (typeof ORDER_TAB_OPTIONS)[number];

/**
 * Generate URL for order page with specific tab
 * @param orderId - The order ID
 * @param tab - The tab to navigate to (optional, defaults to 'details')
 * @returns URL string for the order page with tab parameter
 *
 * @example
 * // Basic order URL (details tab)
 * getOrderUrl('ABC123') // '/dashboard/order/ABC123'
 *
 * // Direct link to messages tab (for emails)
 * getOrderUrl('ABC123', 'messages') // '/dashboard/order/ABC123?tab=messages'
 *
 * // Direct link to history tab
 * getOrderUrl('ABC123', 'history') // '/dashboard/order/ABC123?tab=history'
 */
export function getOrderUrl(orderId: string, tab: OrderTabValue = 'details'): string {
  const basePath = `/dashboard/order/${orderId}`;

  if (tab === 'details') {
    return basePath; // Keep URL clean for default tab
  }

  return `${basePath}?tab=${tab}`;
}

/**
 * Generate direct link to messages tab for email notifications
 * @param orderId - The order ID
 * @returns URL string pointing directly to messages tab
 *
 * @example
 * // Use in email templates when notifying about new messages
 * const emailLink = getOrderMessagesUrl('ABC123');
 * // Result: '/dashboard/order/ABC123?tab=messages'
 *
 * // Complete email link with domain
 * const fullLink = `https://msscorrection.fr${getOrderMessagesUrl('ABC123')}`;
 */
export function getOrderMessagesUrl(orderId: string): string {
  return getOrderUrl(orderId, 'messages');
}

/**
 * Generate direct link to history/timeline tab
 * @param orderId - The order ID
 * @returns URL string pointing directly to history tab
 */
export function getOrderHistoryUrl(orderId: string): string {
  return getOrderUrl(orderId, 'history');
}
