// import { describe, it, expect, vi } from 'vitest';
// import { renderHook } from '@testing-library/react';
// import useLocalStorageHook from '../hooks/local-storage-hook.tsx';
// import { act } from 'react';
//
// describe('useLocalStorageHook', () => {
//   const mockLocalStorage: { [key: string]: string } = {};
//
//   beforeEach(() => {
//     vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
//       (key: string) => mockLocalStorage[key] || null
//     );
//     vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
//       (key: string, value: string) => {
//         mockLocalStorage[key] = value;
//       }
//     );
//     vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(
//       (key: string) => {
//         delete mockLocalStorage[key];
//       }
//     );
//   });
//
//   it('should initialize with the stored value if localStorage is not empty', () => {
//     mockLocalStorage['search'] = 'storedValue';
//
//     const { result } = renderHook(() => useLocalStorageHook('initialValue'));
//
//     expect(result.current[0]).toBe('storedValue');
//   });
//
//   it('should initialize with the fallback value if localStorage is empty', () => {
//     delete mockLocalStorage['search'];
//
//     const { result } = renderHook(() => useLocalStorageHook('initialValue'));
//
//     expect(result.current[0]).toBe('initialValue');
//   });
//
//   it('should update localStorage when state changes', () => {
//     const { result } = renderHook(() => useLocalStorageHook('initialValue'));
//
//     act(() => {
//       result.current[1]('newValue');
//     });
//
//     expect(mockLocalStorage['search']).toBe('newValue');
//   });
//
//   it('should keep the value updated in state after changing it', () => {
//     const { result } = renderHook(() => useLocalStorageHook('initialValue'));
//
//     act(() => {
//       result.current[1]('newValue');
//     });
//
//     expect(result.current[0]).toBe('newValue');
//   });
// });
