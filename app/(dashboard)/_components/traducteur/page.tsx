"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Upload, Send, Check, FileText } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TranslationStatus = 'À traduire' | 'Envoyé' | 'Traduction approuvée'

type TranslationJob = {
  id: string
  translator: {
    firstName: string
    lastName: string
  }
  originalDocument: File | null
  translatedDocument: File | null
  status: TranslationStatus
}

export default function TranslatorDashboard() {
  const [jobs, setJobs] = useState<TranslationJob[]>([
    {
      id: '1',
      translator: { firstName: 'Jean', lastName: 'Dupont' },
      originalDocument: null,
      translatedDocument: null,
      status: 'À traduire'
    },
    {
      id: '2',
      translator: { firstName: 'Marie', lastName: 'Martin' },
      originalDocument: null,
      translatedDocument: null,
      status: 'Envoyé'
    },
    {
      id: '3',
      translator: { firstName: 'Pierre', lastName: 'Bernard' },
      originalDocument: null,
      translatedDocument: null,
      status: 'Traduction approuvée'
    },
  ])

  const handleFileUpload = (jobId: string, fileType: 'original' | 'translated') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setJobs(jobs.map(job => 
        job.id === jobId 
          ? { ...job, [fileType === 'original' ? 'originalDocument' : 'translatedDocument']: file } 
          : job
      ))
    }
  }

  const submitTranslation = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId && job.translatedDocument ? { ...job, status: 'Envoyé' } : job
    ))
  }

  const getStatusBadge = (status: TranslationStatus) => {
    switch (status) {
      case 'À traduire':
        return <Badge variant="secondary">À traduire</Badge>
      case 'Envoyé':
        return <Badge variant="primary">Envoyé</Badge>
      case 'Traduction approuvée':
        return <Badge variant="success">Approuvé</Badge>
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord des traducteurs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom et Prénom</TableHead>
            <TableHead>Document à traduire</TableHead>
            <TableHead>Traduction</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.translator.firstName} {job.translator.lastName}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Voir le document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Document original</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {job.originalDocument ? (
                        <div className="flex items-center space-x-2">
                          <FileText className="h-6 w-6" />
                          <span>{job.originalDocument.name}</span>
                        </div>
                      ) : (
                        <p>Aucun document téléchargé</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Label htmlFor={`upload-original-${job.id}`}>Télécharger le document original</Label>
                      <Input
                        id={`upload-original-${job.id}`}
                        type="file"
                        onChange={handleFileUpload(job.id, 'original')}
                        className="mt-2"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      {job.status === 'À traduire' ? 'Traduire' : 'Voir la traduction'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Traduction du document</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {job.translatedDocument ? (
                        <div className="flex items-center space-x-2">
                          <FileText className="h-6 w-6" />
                          <span>{job.translatedDocument.name}</span>
                        </div>
                      ) : (
                        <p>Aucune traduction téléchargée</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Label htmlFor={`upload-translated-${job.id}`}>Télécharger la traduction</Label>
                      <Input
                        id={`upload-translated-${job.id}`}
                        type="file"
                        onChange={handleFileUpload(job.id, 'translated')}
                        className="mt-2"
                        disabled={job.status === 'Traduction approuvée'}
                      />
                    </div>
                    {job.status !== 'Traduction approuvée' && (
                      <Button 
                        className="mt-4" 
                        onClick={() => submitTranslation(job.id)}
                        disabled={!job.translatedDocument || job.status === 'Traduction approuvée'}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer la traduction
                      </Button>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{getStatusBadge(job.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}