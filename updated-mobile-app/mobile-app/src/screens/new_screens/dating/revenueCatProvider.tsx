import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
import { CustomerInfo } from 'react-native-purchases';

// Use your RevenueCat API keys
const APIKeys = {
	apple: 'appl_PYWvOWsaGexghcFRZiSznGicqEn',
	google: 'goog_pxOWYehyIwMOspLyadbVOqzADWT'
};

interface RevenueCatProps {
	purchasePackage?: (pack: PurchasesPackage) => Promise<void>;
	restorePermissions?: () => Promise<CustomerInfo>;
	user: UserState;
	packages: PurchasesPackage[];
}

export interface UserState {
	items: string[];
	pro: boolean;
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);

// Export context for easy usage
export const useRevenueCat = () => {
	return useContext(RevenueCatContext) as RevenueCatProps;
};
// Provide RevenueCat functions to our app
export const RevenueCatProvider = ({ children }: any) => {
	const [user, setUser] = useState<UserState>({ items: [], pro: false });
	const [packages, setPackages] = useState<PurchasesPackage[]>([]);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const init = async () => {
			if (Platform.OS === 'android') {
				await Purchases.configure({ apiKey: APIKeys.google });
			} else {
				await Purchases.configure({ apiKey: APIKeys.apple });
			}
			setIsReady(true);

			// Use more logging during debug if want!
			Purchases.setLogLevel(LOG_LEVEL.DEBUG);

			// Listen for customer updates
			Purchases.addCustomerInfoUpdateListener(async (info) => {
				updateCustomerInformation(info);
			});

			// Load all offerings and the user object with entitlements
			await loadOfferings();
		};
		init();
	}, []);

	// Load all offerings a user can (currently) purchase
	const loadOfferings = async () => {
		const offerings = await Purchases.getOfferings();
		if (offerings.current) {
			setPackages(offerings.current.availablePackages);
		}
	};

	// Update user state based on previous purchases
	const updateCustomerInformation = async (customerInfo: CustomerInfo) => {
		// const newUser: UserState = { cookies: user.cookies, items: [], pro: false };

		// if (customerInfo?.entitlements.active['Gold_M1'] !== undefined) {
		// 	newUser.items.push(customerInfo?.entitlements.active['Gold_M1'].identifier);
		// }

		// setUser(newUser);
	};

	// Purchase a package
	const purchasePackage = async (pack: PurchasesPackage) => {
		try {
			await Purchases.purchasePackage(pack);

			// Directly add our consumable product
		} catch (e: any) {
			if (!e.userCancelled) {
				alert(e);
			}
		}
	};

	// // Restore previous purchases
	const restorePermissions = async () => {
		const customer = await Purchases.restorePurchases();
		return customer;
	};

	const value = {
		restorePermissions,
		user,
		packages,
		purchasePackage
	};

	// Return empty fragment if provider is not ready (Purchase not yet initialised)
	if (!isReady) return <></>;

	return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
};

function alert(e: any) {
    throw new Error('Function not implemented.');
}
