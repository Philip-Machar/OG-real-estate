// File: src/services/blogService.ts
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp, increment } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

const BLOGS_COLLECTION = 'blogPosts';

export async function uploadBlogImageToStorage(file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `blogs/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  const storageRef = ref(storage, fileName);
  
  const uploadResult = await uploadBytes(storageRef, file);
  return await getDownloadURL(uploadResult.ref);
}

export async function createBlogPost(blogData: any): Promise<string> {
  const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
    ...blogData,
    views: 0, 
    createdAt: serverTimestamp(),
    timestamp: Date.now(),
  });
  return docRef.id;
}

export async function updateBlogPost(id: string, blogData: any): Promise<void> {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  await updateDoc(docRef, {
    ...blogData,
    updatedAt: serverTimestamp(),
  });
}

export async function incrementBlogView(id: string): Promise<void> {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  await updateDoc(docRef, { views: increment(1) });
}

export async function fetchAllBlogPosts(status: 'published' | 'draft' | 'all' = 'all'): Promise<any[]> {
  try {
    const q = query(collection(db, BLOGS_COLLECTION), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    let firestoreBlogs = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    if (status !== 'all') {
      firestoreBlogs = firestoreBlogs.filter((p: any) => p.status === status);
    }

    return firestoreBlogs;
  } catch (error) {
    console.error('Error fetching blogs from Firebase:', error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<any | null> {
  try {
    const q = query(collection(db, BLOGS_COLLECTION), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
  }
  return null;
}

export async function fetchBlogPostById(id: string): Promise<any | null> {
  try {
    const docSnap = await getDoc(doc(db, BLOGS_COLLECTION, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
  }
  return null;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(docRef);
}