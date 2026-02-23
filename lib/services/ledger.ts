import { apiClient } from '../api/config';
import { handleApiError } from '../api/error-handler';
import { LedgerResponse } from '../types/ledger';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get ledger items for the authenticated user
 * @param page Page number for pagination
 * @returns Promise with ledger items
 * @throws ApiException if the request fails
 */
export const getLedgerItems = async (page: number): Promise<LedgerResponse> => {
    try {
        const response = await apiClient.get<LedgerResponse>(`/partner/ledger?page=${page}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}

export const requestWithdrawal = async (amount: number): Promise<{ status: boolean; message: string }> => {
    try {
        const response = await apiClient.post<{ status: boolean; message: string }>(
            '/partner/payment/withdraw',
            { amount }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}

export const initAddMoney = async (amount: number): Promise<{ status: boolean; message: string; payment_url: string }> => {
    try {
        const response = await apiClient.post<{ status: boolean; message: string; payment_url: string }>(
            '/partner/payment/init-add-money',
            { amount }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}

export const downloadStatement = async () => {
  try {
    console.log('Downloading statement...');

    const token = await AsyncStorage.getItem('token');

    const fileName = `ledger-${Date.now()}.xlsx`;
    const destination = new File(Paths.document, fileName);

    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://upworx03.upworx.in/api';

    await File.downloadFileAsync(
      `${API_BASE_URL}/partner/download-statement`,
      destination,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await Sharing.shareAsync(destination.uri);

    return { status: true };
  } catch (error) {
    console.log('Download error:', error);
    return { status: false };
  }
};