// File: src/services/propertyService.ts
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { Property } from '@/mocks/properties';

const PROPERTIES_COLLECTION = 'properties';

export async function uploadImageToStorage(file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `properties/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  const storageRef = ref(storage, fileName);
  
  const uploadResult = await uploadBytes(storageRef, file);
  return await getDownloadURL(uploadResult.ref);
}

export async function createProperty(propertyData: any): Promise<string> {
  const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
    ...propertyData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePropertyStatus(id: string, status: 'published' | 'rejected'): Promise<void> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await updateDoc(docRef, { visibilityStatus: status });
}

export async function fetchAllProperties(status: 'published' | 'pending' | 'all' = 'published'): Promise<Property[]> {
  try {
    const q = query(collection(db, PROPERTIES_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    let firestoreProperties: Property[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as unknown as Property; 
    });

    if (status !== 'all') {
      firestoreProperties = firestoreProperties.filter(p => (p as any).visibilityStatus === status);
    }

    return firestoreProperties;
  } catch (error) {
    console.error('Error fetching properties from Firebase:', error);
    return [];
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const docSnap = await getDoc(doc(db, PROPERTIES_COLLECTION, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as Property;
    }
  } catch (error) {
    console.error('Error fetching property by ID:', error);
  }
  return null;
}

export async function deleteProperty(id: string): Promise<void> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function updatePropertyData(id: string, propertyData: any): Promise<void> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await updateDoc(docRef, {
    ...propertyData,
    updatedAt: serverTimestamp(),
  });
}